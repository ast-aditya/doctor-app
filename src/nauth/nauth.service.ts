import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import { login_Dto, register_Dto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt' 
import { InjectModel } from '@nestjs/mongoose';
import { AuthUserRegister, UserDocument} from './schema/auth_register.schema';
import { Model } from 'mongoose';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { OAuth2Client } from 'google-auth-library';
import { Response } from 'express';

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );
  
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


    async UserSignup(signupDto: AuthUserRegister) {
      const { name,email,password,user_Type} = signupDto;
      let newUser;
      try {
        const existingEmail = await this.UserService.getUserbyEmail(
          email,
        );
        if (existingEmail) {
          throw new ConflictException(
            'Customer with the same email already exists',
          );
        }
        const hashedPassword = await bcrypt.hash(password, 10);
  
        newUser = await this.UserService.createUser({
          name,
          email,
          password: hashedPassword,
          user_type: user_Type,
        });
        const user = {
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          user_Type: newUser.user_Type
          
        };
  
        const UserN = await this.UserService.createUser({
          user,
          name,
        });
       
        const tokens = await this.getTokens(
          newUser.id,
          newUser.firstName,
         
        );
  
        await this.updateRefreshToken(newUser.id, tokens.refresh_token);
  
        return { tokens, profile :  UserN };
      } catch (error) {
        console.log("caught and error")
        if(newUser) await this.UserService.deleteUser(newUser.id)
        if (
          error instanceof ConflictException ||
          error instanceof BadRequestException ||
          error instanceof NotFoundException
        ) {
          throw error;
        }
        throw new InternalServerErrorException(
          `Error while creating customer ${error.message}`,
        );
      }
    }

    async updateRefreshToken(user_id: string, refresh_token: string) {
      try {
        const hash = await this.hashData(refresh_token);
        await this.UserService.updateUserToken(user_id, hash);
      } catch (error) {}
    }
    
  }