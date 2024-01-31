import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientUser } from 'src/patient/Schemas/patientUser.schema';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService : JwtService,
        @InjectModel('PatientUser') private userModel: Model<PatientUser>){

    }
    
    async validateUser({username, password} : AuthPayloadDto){
        const findUser = await this.userModel.findOne({ username });
        if(!findUser) return null;
        if(comparePasswords(password , findUser.password)){
            const {password ,...user} = findUser;
            return this.jwtService.sign(user)
        }
    }
}
