// appointment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from './schemas/appointment.schema';
import { CreateAppointmentDto } from './dto/appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment.name) private appointmentModel: Model<Appointment>) {}

  async createAppointment(doctorID: string, user: any, createAppointmentDto: CreateAppointmentDto) {
    const { date, time } = createAppointmentDto;
    const patientID = user.id;
    console.log(patientID);
    return await this.appointmentModel.findOneAndUpdate(
      { doctorID, patientID, date, time },  
      { ...createAppointmentDto, doctorID, patientID },
      { upsert: true, new: true }
    );
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
