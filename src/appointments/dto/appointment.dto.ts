// dto/create-appointment.dto.ts
import { IsString, IsDate, IsArray, IsObject } from 'class-validator';
import { createPatientProfile } from 'src/patient/dto/createPatientProfile.dto';

export class ScheduleDto {
    @IsString()
    day: string;
  
    @IsString()
    openingTime: string;
  
    @IsString()
    closingTime: string;
  }
  
export class ClinicDto {
    @IsString()
    name: string;
  
    @IsString()
    address: string;
  
    @IsString()
    contactNumber: string;
  
    @IsString()
    email: string;
  
    @IsArray()
    schedule: ScheduleDto;
  }

export class CreateAppointmentDto {
  // @IsString()
  doctorID: string;

  @IsString()
  patientID: string;

//   @IsDate()
  date: Date;

  @IsString()
  time: string;

  @IsString()
  status: string;

  @IsObject()
  patient: createPatientProfile;

  @IsObject()
  clinic: ClinicDto;
}



