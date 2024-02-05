import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { login_Dto, register_Dto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt' 
import { InjectModel } from '@nestjs/mongoose';
import { AuthUserRegister, UserDocument} from './schema/auth_register.schema';
import { Model } from 'mongoose';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class NauthService {
    constructor(@InjectModel(AuthUserRegister.name) private UserModel: Model<AuthUserRegister>,
    private jwtService : JwtService,
    private UserService : UserService){}

    async signupLocal(dto : register_Dto){
        try {
            const { name, email, password, role } = dto;
            const hash = await this.hashData(password);
            const existingUser = await this.UserService.getUserbyEmail(email);
            if (existingUser) {
                throw new ConflictException('Email already in use');
            }

            const hashedPassword: string = await bcrypt.hash(password, 10);

            const user = await this.UserService.createUser({
                name,
                email,
                password: hashedPassword,
                role,
              });
            // const newUser = new this.UserModel({
            //     email : email,
            //     password : hash
            // })
            // const user = await newUser.save();
            const tokens = await this.getTokens(user.id, user.email)
            await this.updateRtHash(user.id, tokens.refresh_token);
            // console.log(`User created successfully with Id : ${user.id}`);
            return tokens;
        } catch (error) {
            console.error(`Error occurred during signup: ${error}`);
            throw error;
        }
    }
    
    async siginLocal(dto : login_Dto){
        try {
            const {email, password} = dto;
            const user = await this.UserService.getUserbyEmail(email);
    
            if(!user){
                throw new NotFoundException('User not found');
            }
            const password_Match = await bcrypt.compare(password, user.password);
            if(!password_Match) throw new ForbiddenException('Invalid Credentials') 
            
            // generate new tokens
            const tokens = await this.getTokens(user.id, user.email)
            await this.updateRtHash(user.id, tokens.refresh_token);

            console.log(`User logged in successfully with Id : ${user.id}`);

            const userData = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
              };
              return { tokens, userData };
        } catch (error) {
            console.error(`Error occurred during sign in: ${error}`);
            throw error;
        }
    }
    
    logout(userId: any) {
        try {
          return this.UserService.removeRefreshToken(userId);
        } catch (error) {
          throw new InternalServerErrorException(
            `Error while logging out ${error.message}`,
          );
        }
      }
    async refreshTokens(user_Id : string, rt: string){
        try {
            const user = await this.UserService.getUserbyId(user_Id);
            if(!user || !user.hashed_rt) throw new ForbiddenException("Access denied")
            const rt_Matches = await bcrypt.compare(rt, user.hashed_rt)
            
            if(!rt_Matches) throw new ForbiddenException("Access Denied")
    
            const tokens = await this.getTokens(user.id, user.email)
            await this.updateRtHash(user.id, tokens.refresh_token);
            return tokens;
        } catch (error) {
            throw new InternalServerErrorException(
                `Error while logging out ${error.message}`,
            );
        }
    }
    
    async updateRtHash(user_Id: string, rt: string){
        const hash = await this.hashData(rt);
        const user = await this.UserModel.findOneAndUpdate({ _id: user_Id }, { hashed_rt: hash });

    }
    hashData(data : string){
        return bcrypt.hash(data, 10);
    }
    async getTokens(user_id : string , email : string) : Promise<Tokens>{
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub : user_id,
                email,
            },
            {
                secret: 'at-secret',
                expiresIn: 60 * 15,
            },
            ),
            this.jwtService.signAsync({
                sub : user_id,
                email,
            },
            {
                secret: 'rt-secret',
                expiresIn: 60 * 60 * 24 * 7,
            },
            ),
        ])
    
        return {
            access_token : at, 
            refresh_token : rt
        }
    }
    // async signupLocal(dto : AuthRegisterDto) : Promise<Tokens>{
    //     try {
    //         const { email, password} = dto;
    //         const hash = await this.hashData(password);
    //         const existingUser = await this.UserModel.findOne({ email: email });
    //         if (existingUser) {
    //             throw new ConflictException('Email already in use');
    //         }
    //         const newUser = new this.UserModel({
    //             email : email,
    //             password : hash
    //         })
    //         const user = await newUser.save();
    //         const tokens = await this.getTokens(user.id, user.email)
    //         await this.updateRtHash(user.id, tokens.refresh_token);
    //         console.log(`User created successfully with Id : ${user.id}`);
    //         return tokens;
    //     } catch (error) {
    //         console.error(`Error occurred during signup: ${error}`);
    //         throw error;
    //     }
    // }
    
    // async siginLocal(dto : AuthRegisterDto) : Promise<Tokens>{
    //     try {
    //         const {email, password} = dto;
    //         const user = await this.UserModel.findOne({email});
    
    //         if(!user){
    //             throw new NotFoundException('User not found');
    //         }
    //         const password_Match = await bcrypt.compare(password, user.password);
    //         if(!password_Match) throw new ForbiddenException('Invalid Credentials') 
            
    //         // generate new tokens
    //         const tokens = await this.getTokens(user.id, user.email)
    //         await this.updateRtHash(user.id, tokens.refresh_token);
    //         return tokens;
    //     } catch (error) {
    //         console.error(`Error occurred during sign in: ${error}`);
    //         throw error;
    //     }
    // }
    
    // async logout(user_Id : string) {
    //     try {
    //         console.log(user_Id)
    //         const user = await this.UserModel.findOne({_id: user_Id});
    //         console.log(user)
    //         if(!user){
    //             throw new NotFoundException();
    //         }
        
    //         user.hashed_rt = null;
    //         await user.save();
    //     } catch (error) {
    //         console.error(`Error occurred during logout: ${error}`);
    //         throw error;
    //     }
    // }
    // async refreshTokens(user_Id : string, rt: string){
    //     try {
    //         const user = await this.UserModel.findOne({_id: user_Id})
    //         if(!user) throw new ForbiddenException("Access denied")
    //         const rt_Matches = await bcrypt.compare(rt, user.hashed_rt)
            
    //         if(!rt_Matches) throw new ForbiddenException("Access Denied")
    
    //         const tokens = await this.getTokens(user.id, user.email)
    //         await this.updateRtHash(user.id, tokens.refresh_token);
    //         return tokens;
    //     } catch (error) {
    //         console.error(`Error occurred during token refresh: ${error}`);
    //         throw error;
    //     }
    // }
    
    // async updateRtHash(user_Id: string, rt: string){
    //     const hash = await this.hashData(rt);
    //     const user = await this.UserModel.findOneAndUpdate({ _id: user_Id }, { hashed_rt: hash });

    // }
    // hashData(data : string){
    //     return bcrypt.hash(data, 10);
    // }
    // async getTokens(user_id : string , email : string) : Promise<Tokens>{
    //     const [at, rt] = await Promise.all([
    //         this.jwtService.signAsync({
    //             sub : user_id,
    //             email,
    //         },
    //         {
    //             secret: 'at-secret',
    //             expiresIn: 60 * 15,
    //         },
    //         ),
    //         this.jwtService.signAsync({
    //             sub : user_id,
    //             email,
    //         },
    //         {
    //             secret: 'rt-secret',
    //             expiresIn: 60 * 60 * 24 * 7,
    //         },
    //         ),
    //     ])
    
    //     return {
    //         access_token : at, 
    //         refresh_token : rt
    //     }
    // }

    // service for users 
    // async getUsers(query: any): Promise<any> {
    //     try {
    //       const doc = await this.UserModel.find({}).select(
    //         '-password -refreshToken',
    //       );
    //       const totalCount = await this.UserModel.countDocuments();
    
    //       // Convert Mongoose document to a plain JavaScript object
    //       const docObject = doc.map(doc => doc.toObject());
    
    //       return { results: docObject.length, total: totalCount, data: docObject };
    //     } catch (error) {
    //       throw new InternalServerErrorException(
    //         'Something went wrong while fetching users',
    //       );
    //     }
    // }
    
    // async getUserbyEmail(email: string): Promise<UserDocument> {
    //     try {
    //       const user = await this.UserModel.findOne({ email: email });
    //     //   this.logger.log(`User successfully fetched with Id : ${user.id}`)
    //       return user;
    //     } catch (error) {
    //       console.error(
    //         `Error while finding user with email ${email}: ${error.message}`,
    //       );
    //       throw new InternalServerErrorException(
    //         'Something went wrong while finding the user',
    //       );
    //     }
    //   }
    
}
