import { Injectable } from '@nestjs/common';
import { PatientUser } from './Schemas/patientUser.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { encodePassword } from 'src/utils/bcrypt';
import { CreatePatientUser } from './dto/createPatientUser.dto';
import { createPatientProfile } from './dto/createPatientProfile.dto';
import { PatientProfile } from './Schemas/patientProfile.schema';
import { addPatientAppointments } from './dto/addPatientAppointments.dto';
import { CreateAppointment } from './Schemas/patientAppointment.schema';
import { SummaryDTO } from './dto/appointmentSummary.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(PatientUser.name) private patientUserModel: Model<PatientUser>,
    @InjectModel(PatientProfile.name) private patientProfileModel: Model<PatientProfile>,
    @InjectModel(CreateAppointment.name) private patientAppointmentModel: Model<CreateAppointment>,
  ) { }

  // to create profile for logged in user
  async createPatientProfile(user: any, createPatientProfile: createPatientProfile) {
    const username = user.username
    const user_id = user.id;

    const updatedProfile = {
      ...createPatientProfile,
      user_id: user_id,
    };
  
    return this.patientProfileModel.updateOne({ username }, { $set: updatedProfile }, { upsert: true });
  }

  // get logged in users profile
  async getPatientProfile(user: any) {
    const username = user.username;
    console.log(username)
    return this.patientProfileModel.findOne({ username });
  }

  // delete profile by logged in user
  async deletePatientProfile(user: any) {
    const username = user.username;
    return this.patientProfileModel.deleteOne({ username });
  }

  // get profile by id
  async getProfileByID(user_id: string){
    try {
      const profile = await this.patientProfileModel.findOne({ user_id });
      if (!profile) {
        console.log(`No profile found for patientID: ${user_id}`);
      } else {
        console.log(profile);
      }
      return profile;
    } catch (error) {
      console.error(`Error fetching profile for patientID: ${user_id}`, error);
      throw error;
    }
  }

  // delete profile by id
  async deleteProfileByID(user_id: string){
    console.log("getProfileByID")
    try {
      const profile = await this.patientProfileModel.findOneAndDelete({ user_id });
      if (!profile) {
        console.log(`No profile found for patientID: ${user_id}`);
      } else {
        console.log(profile);
      }
      return profile;
    } catch (error) {
      console.error(`Error fetching profile for patientID: ${user_id}`, error);
      throw error;
    }
  }
}
