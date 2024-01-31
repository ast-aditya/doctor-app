import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientUser } from 'src/patient/Schemas/patientUser.schema';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';
import { userRegistrationDto } from './dto/register.dto';
import { UserLogin } from './schema/UserLogin.schema';
import { UserRegister } from './schema/UserRegistration.schema';

@Injectable()
export class AuthService {
    constructor(private jwtService : JwtService,
        // @InjectModel('PatientUser') private userModel: Model<PatientUser> ,
        @InjectModel('UserLogin') private userLoginModel: Model<UserLogin> ,
        @InjectModel('UserRegister') private userRegisterModel: Model<UserRegister> ,
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
    async registerUser({username, password, role} : userRegistrationDto){
        const hashedPassword = await encodePassword(password);
        const newUser = new this.userRegisterModel({ username, password: hashedPassword, role });
        return await newUser.save();
    }
}
