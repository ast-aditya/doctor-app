import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { createPatientProfile } from './dto/createPatientProfile.dto';
import { PatientProfile } from './Schemas/patientProfile.schema';
import { UserService } from 'src/nauth/user.service';
import { updatePatientProfile } from './dto/updatePatientProfile.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(PatientProfile.name) private patientProfileModel: Model<PatientProfile>,
    private UserService : UserService
  ) { }

  // to create profile for logged in user
  async createPatientProfile(createPatientProfile: createPatientProfile, user_Id : string) {
    try {
        const {age, gender, dob, address, contact} = createPatientProfile;
        const user = await this.UserService.getUserbyId(user_Id);
        if(!user){
          throw new NotFoundException('User not found');
      }

      // const existProfile = await this.getPatientProfile(user_Id);
      // console.log(existProfile)
      // if(existProfile){
      //   console.log("inside error")
      //   throw new ConflictException('User Profile already exists');
      // }
      
        const newProfile = new this.patientProfileModel({
          user_Id: user_Id,
          name: user.name,
          email: user.email,
          role: user.role,
          age: age,
          gender: gender,
          dob: dob,
          address: address,
          contact: contact
        });

        const userProfile = await newProfile.save();
        console.log(`User Profile created successfully with Id : ${userProfile.id}`);
        return userProfile;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while creating profile ${error.message}`,
    );
    }
}


async updatePatientProfile(updatePatientProfile: updatePatientProfile, user_Id : string) {
  try {
      const {age, gender, dob, address, contact} = updatePatientProfile;
      const existProfile = await this.getPatientProfile(user_Id);
      if(!existProfile){
        throw new NotFoundException('User Profile do not exists');
      }
      const user = await this.UserService.getUserbyId(user_Id);
      console.log(user)
      if(!user){
        throw new NotFoundException('User not found');
    }

      const updatedProfile = {
        user_Id: user_Id,
        name: user.name,
        email: user.email,
        role: user.role,
        age: age,
        gender: gender,
        dob: dob,
        address: address,
        contact: contact
      };

      return await this.patientProfileModel.updateOne({ user_Id: user_Id }, { $set: updatedProfile }, { upsert: true });
  } catch (error) {
    throw new InternalServerErrorException(
      `Error while updating profile ${error.message}`,
  );
  }
}



  // get logged in users profile
  async getPatientProfile(user_Id: string) {
    try {
        const patientProfile = await this.patientProfileModel.findOne({ user_Id });
        if (!patientProfile) {
            throw new NotFoundException('Patient profile not found');
        }
        return patientProfile;
    } catch (error) {
      console.error(`Error occurred getting the user profile: ${error}`);
      throw error;
    }
}


  // delete profile by logged in user
  async deletePatientProfile(user_Id: string) {
    try {
        const existProfile = await this.getPatientProfile(user_Id);
        if(!existProfile){
            throw new NotFoundException('User Profile do not exists');
        }
        return await this.patientProfileModel.deleteOne({ user_Id: user_Id });
    } catch (error) {
        console.error(`Error occurred deleting the user profile: ${error}`);
        throw error;
    }
}
// get profile by id
async getProfileByID(user_Id: string){
  try {
    const profile = await this.patientProfileModel.findOne({ user_Id });
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }
    return profile;
  } catch (error) {
    console.error(`Error occurred getting the user profile: ${error}`);
    throw error;
  }
}

// delete profile by id
async deleteProfileByID(user_Id: string){
  try {
    const existProfile = await this.getPatientProfile(user_Id);
    if(!existProfile){
      throw new NotFoundException('User Profile do not exists');
    }
    return await this.patientProfileModel.deleteOne({ user_Id: user_Id });
  } catch (error) {
    console.error(`Error occurred deleting the user profile: ${error}`);
    throw error;
  }
}

}
