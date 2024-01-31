// doctorprf.dto.ts
import { IsString, IsEmail, IsArray, IsObject, IsNumber, ArrayMinSize } from 'class-validator';

export class DoctorPrfDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;


  @IsString()
  password: string;

  @IsNumber()
  contactNumber: number;

  @IsString()
  specialization: string;

  @IsObject()
  location: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };

  @IsArray()
  @ArrayMinSize(1)
  education: Array<{
    degree: string;
    university: string;
    year: number;
  }>;

  @IsArray()
  affiliations: string[];

  @IsArray()
  experience: Array<{
    position: string;
    organization: string;
    duration: string;
  }>;
}
