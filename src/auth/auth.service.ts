import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientUser } from 'src/patient/Schemas/patientUser.schema';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';
import { userRegistrationDto } from './dto/register.dto';
import { UserLogin } from './schema/UserLogin.schema';
import { UserRegister } from './schema/UserRegistration.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
    constructor(private jwtService : JwtService,
        // @InjectModel('PatientUser') private userModel: Model<PatientUser> ,
        @InjectModel('UserLogin') private userLoginModel: Model<UserLogin> ,
        @InjectModel('UserRegister') private userRegisterModel: Model<UserRegister> ,
        private readonly mailerService : MailerService
        ){

    }
    
    async validateUser({username, password} : AuthPayloadDto){
        const findUser = await this.userLoginModel.findOne({ username });
        if(!findUser) return null;
        if(comparePasswords(password , findUser.password)){
            const {password ,...user} = findUser;
            return this.jwtService.sign(user)
        }
    }
    // async registerUser({username, password, role} : userRegistrationDto){
    //     const hashedPassword = await encodePassword(password);
    //     const newUser = new this.userRegisterModel({ username, password: hashedPassword, role });
    //     return await newUser.save();
    // }

    // sendMail() : void{
    //     this.mailerService.sendMail({
    //         to: 'shadowmonarch712@gmail.com',
    //         from: 'adityasrivastava0709@gmail.com',
    //         subject: 'Verification token',
    //         text: 'Welcome'
    //     })
    // }
    async registerUser({username, password, role} : userRegistrationDto){
        const hashedPassword = await encodePassword(password);
        const otp = randomBytes(4).toString('hex');  // generate a 4-byte OTP
        const newUser = new this.userRegisterModel({ username, password: hashedPassword, role, otp });
        await newUser.save();
    
        // send the OTP to the user's email
        this.sendMail(username, otp);
      }
    
      sendMail(to: string, otp: string) : void{
        this.mailerService.sendMail({
          to,
          from: 'adityasrivastava0709@gmail.com',
          subject: 'Verification token',
          text: `Your OTP for email verification is: ${otp}`
        })
      }

      async verifyOtp(username: any, userEnteredOtp: string) {
        const user = await this.userRegisterModel.findOne({ username });
    
        if (!user) {
          throw new BadRequestException('User not found');
        }
    
        if (user.otp !== userEnteredOtp) {
          throw new BadRequestException('Invalid OTP');
        }
    
        // If the OTP is correct, set the user as verified
        user.isVerified = true;
        await user.save();
      }
}
