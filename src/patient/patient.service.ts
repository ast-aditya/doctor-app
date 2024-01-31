import { Injectable } from '@nestjs/common';
import { PatientUser } from './Schemas/patientUser.schema';
import { Model } from 'mongoose';
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


  async createPatientUser(patientDto: CreatePatientUser) {
    const password = encodePassword(patientDto.password);
    // const createdPatient = new this.patientUserModel(patientDto);
    const createdPatient = new this.patientUserModel({
      ...patientDto,
      password: password,
    });
    // console.log("inside patient service");
    return createdPatient.save();
  }

  async createPatientProfile(username: any, createPatientProfile: createPatientProfile) {
    return this.patientProfileModel.updateOne({ username }, { $set: createPatientProfile });
  }

  async addAppointment(username: any, createPatientAppointment: addPatientAppointments) {
    return this.patientAppointmentModel.updateOne({ username }, { $set: createPatientAppointment });
  }

  async changeStatusAppointment(username: any, appointmentId: string, newStatus: string) {
    if (!['Finished', 'Rescheduled', 'Cancelled'].includes(newStatus)) {
      throw new Error('Invalid status.');
    }

    return this.patientAppointmentModel.updateOne(
      { username, 'appointments._id': appointmentId },
      { $set: { 'appointments.$.status': newStatus } }
    );
  }

  async addAppointmentSummary(username: any, appointmentId: string, summary: SummaryDTO) {
    // First, find the user with the given username
    const user = await this.patientAppointmentModel.findOne({ username });
  
    if (user) {
      // Find the appointment with the given ID in the user's appointments array
      const appointment = user.appointments.find(appointment => appointment._id.toString() === appointmentId);
      console.log(appointment)
      if (appointment && appointment.status === 'Finished') {
        // If the appointment exists and its status is 'Finished', add the summary
        const appointmentIndex = user.appointments.indexOf(appointment);
        const update = {};
        console.log(summary)
        update[`appointments.${appointmentIndex}.summary`] = summary;
  
        await this.patientAppointmentModel.updateOne({ username }, { $set: update });
        console.log('Summary added to the appointment');
      } else {
        throw new Error('Appointment not found or not finished');
      }
    } else {
      throw new Error('User not found');
    }
  }
  
  
  

}
