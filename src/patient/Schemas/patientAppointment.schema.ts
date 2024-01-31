import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Address } from './patientProfile.schema';
import { SummaryDTO } from '../dto/appointmentSummary.dto';

@Schema()
export class Schedule {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  time: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema()
export class Clinic {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Address, required: true })
  address: Address;

  @Prop({ required: true })
  contact: number;

  @Prop({ required: true })
  email: string;

  @Prop({ type: Schedule, required: true })
  schedule: Schedule;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);

@Schema()
export class Appointment {

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: Clinic, required: true })
  clinic: Clinic;

  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  summary: SummaryDTO;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);

@Schema({ collection: 'patientusers' })
export class CreateAppointment extends Document {
  @Prop({ type: [Appointment], required: true })
  appointments: Appointment[];
}

export const CreateAppointmentSchema = SchemaFactory.createForClass(CreateAppointment);
