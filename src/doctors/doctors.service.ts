import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { encodePassword } from 'src/utils/bcrypt';
import { DoctorProfile } from './schemas/doctorsProfile.schema';
import { DoctorUserSc } from './schemas/doctorsUser.schema';
import { DoctorPrfDto } from './dto/doctorPrf.dto';
import { DoctorUser } from './dto/doctorUser.dto';


@Injectable()
export class DoctorsService {
    constructor(
        @InjectModel(DoctorUserSc.name) private doctorUserModel: Model<DoctorUserSc>,
        @InjectModel(DoctorProfile.name) private doctorProfileModel: Model<DoctorProfile>,
      ) {}

    
    async DoctorUserDto(doctorDto: DoctorUser){
        const password = encodePassword(doctorDto.password);
        // const createdPatient = new this.patientUserModel(patientDto);
        const createdDoctor = new this.doctorUserModel({
          ...doctorDto,
          password: password,
      });
        console.log("inside doctor service");
        return createdDoctor.save();
    }

    async DoctorPrfDto(username: any, createDoctorProfile: DoctorPrfDto) {
      console.log(createDoctorProfile)
      return this.doctorProfileModel.updateOne({ username }, { $set: createDoctorProfile });
  }
  async findAll(): Promise<DoctorUser[]> {
    console.log("tmkc");
    return this.doctorUserModel.find().exec();
  }

}
