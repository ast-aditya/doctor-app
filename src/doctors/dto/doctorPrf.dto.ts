// doctorprf.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, IsObject, IsNumber, ArrayMinSize } from 'class-validator';

export class DoctorPrfDto {
  @ApiProperty()
  @IsString()
  doc_id: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;



  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNumber()
  contactNumber: number;

  @ApiProperty()
  @IsString()
  specialization: string;

  @ApiProperty()
  @IsObject()
  location: string[];
  

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  education: Array<{
    degree: string;
    university: string;
    year: number;
  }>;

  @ApiProperty()
  @IsArray()
  affiliations: string[];

  @ApiProperty()
  @IsArray()
  experience: Array<{
    position: string;
    organization: string;
    duration: string;
  }>;
}
