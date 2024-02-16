import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { login_Dto, register_Dto } from './dto/user.dto';
import * as bcrypt from 'bcrypt' 
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument} from './schema/user.schema';
import { Model } from 'mongoose';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
  );

@Injectable()
export class NauthService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>,
    private jwtService : JwtService,
    private UserService : UserService){}
    async googleLogin(req: any) {
        const user = req.user;
        console.log(user)
        let existingUser = await this.UserService.getUserbyEmail(user.email)
        console.log(existingUser)
      
        if(!existingUser){
          console.log("inside create user google ")
          console.log(user)
          const newUser = await this.UserService.createUser({
            name: user.firstName + " " + user.lastName,
            email: user.email,
            password: '',
            picture: user.picture,
          });
          const userId = newUser.id;
      
          const tokens = await this.getTokens(
            userId,
            user.email,
          );
      
          await this.updateRtHash(
            userId,
            tokens.refresh_token,
          );
      
          return { tokens, profile: newUser }; 
        }else{
          const updatedUser: any = await this.UserService.updateUser({
            name : existingUser.name,
            email : existingUser.email,
            password: '',
            picture: existingUser.picture,
          }  , existingUser.id);
      
          if (updatedUser) {
            const tokens = await this.getTokens(
              updatedUser.id,
              updatedUser.email,
            );
      
            const newUser = await this.updateRtHash(
              updatedUser.id,
              tokens.refresh_token,
            );
      
            return { tokens, profile: existingUser };
          }
        }
      }
      
    async signupLocal(dto : register_Dto){
        try {
            const { name, email, password } = dto;
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
                // role,
              });
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
                role: user.user_Type,
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
}
