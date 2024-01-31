import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';
import { Address } from './createPatientProfile.dto';

export class Schedule{
    readonly date : Date;
    readonly time : string;
}

export class Clinic {
    readonly name : string;
    readonly address : Address;
    readonly contact : number;
    readonly email : string;
    readonly schedule : Schedule;
}

export class Appointment {
  @IsDate()
  readonly date: Date; 

  @IsString()
  readonly time: string;

  @IsString()
  readonly status: string;

  readonly clinic: Clinic;
}

export class addPatientAppointments {
  readonly appointments: Appointment[];
}
