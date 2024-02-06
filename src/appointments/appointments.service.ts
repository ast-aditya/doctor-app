// appointment.service.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from './schemas/appointment.schema';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { UserService } from 'src/nauth/user.service';

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
  private UserService : UserService) {}

  async createAppointment(doctorID: string, patient_Id: string, createAppointmentDto: CreateAppointmentDto) {
    try {
        const { date, time } = createAppointmentDto;
        const doctor = await this.UserService.getUserbyId(doctorID);
        if(!doctor){
          throw new NotFoundException('Doctor not found');
        }
        const patient = await this.UserService.getUserbyId(patient_Id);
        if(!patient){
          throw new NotFoundException('Patient not found');
        }
        const newAppointment = {
          doctorID: doctorID,
          patient_Id: patient_Id,
          date: date,
          time: time
        };
        return await this.appointmentModel.findOneAndUpdate(
          { doctorID, patient_Id, date, time },  
          { ...createAppointmentDto, doctorID, patient_Id },
          { upsert: true, new: true }
        );
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while creating appointment ${error.message}`,
      );
    }
  }
  async getAllAppointments(){
    return await this.appointmentModel.find();
  }

  async deleteAppointment(appointmentID: string) {
    return await this.appointmentModel.findByIdAndDelete(appointmentID);
  }
  async getAppointmentsByPatient(patientID: string) {
    const appointments = await this.appointmentModel.find({ patientID });
    return appointments;
  }
  async getAppointmentsByDoctor(doctorID: string) {
    const appointments = await this.appointmentModel.find({ doctorID });
    return appointments;
  }

  async changeAppointmentStatus(appointmentID: string, status: string) {
    // Check if the status is either 'finished' or 'scheduled'
    console.log(status = status.trim().toLowerCase())
    if (status !== 'finished' && status !== 'scheduled') {
      throw new Error('Invalid status. Status can only be "finished" or "scheduled".');
    }
    const appointment = await this.appointmentModel.findOneAndUpdate({ _id: appointmentID }, { status }, { new: true });
    return appointment;
  }

  async getScheduledAppointmentsForPatient(user: any) {
    const patientID = user.id;
    const appointments = await this.appointmentModel.find({ patientID, status: 'scheduled'});
    return appointments;
  }
  
  async getScheduledAppointmentsForDoctor(user: any) {
    const doctorID = user.id;
    const appointments = await this.appointmentModel.find({ doctorID, status: 'scheduled' });
    return appointments;
  }
}
