// schema/appointment.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PatientProfile } from 'src/patient/Schemas/patientProfile.schema';



@Schema()
export class Schedule {
  @Prop()
  day: string;

  @Prop()
  openingTime: string;

  @Prop()
  closingTime: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema()
export class Clinic {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  contactNumber: string;

  @Prop()
  email: string;

  @Prop()
  schedule: Schedule;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);

@Schema()
export class Appointment extends Document {
  @Prop()
  doctorID: string;

  @Prop()
  patientID: string;

  @Prop()
  date: Date;

  @Prop()
  time: string;

  @Prop()
  status: string;

  @Prop()
  patient: PatientProfile;

  @Prop()
  clinic: Clinic;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);

// @Schema()
// export class Patient {
//   @Prop()
//   firstName: string;

//   @Prop()
//   lastName: string;

//   @Prop()
//   email: string;

//   @Prop()
//   contactNumber: string;

//   @Prop()
//   dateOfBirth: Date;

//   @Prop()
//   gender: string;
// }

// export const PatientSchema = SchemaFactory.createForClass(Patient);
