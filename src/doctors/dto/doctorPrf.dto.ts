// doctorprf.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, IsObject, IsNumber, ArrayMinSize, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class Doc_address{
  @ApiProperty({
    description: 'line 1 of the address',
    example: 'abc-123'
  })
  @IsString()
  readonly line1: string;

 @ApiProperty({
    description: 'line 2 of the address',
    example: 'def-456'
  })
  
  @IsString()
  @IsOptional()
  readonly line2?: string;

  @ApiProperty({
    description: 'city of the doctor',
    example: 'Noida'
  })

  @IsString()
  readonly city: string;

  @ApiProperty({
    description: 'state of the doctor',
    example: 'Uttar Pradesh'
  })
  @IsString()
  readonly state: string;

  @ApiProperty({
    description: 'pincode of the doctor',
    example: '201304'
  })
  @IsString()
  readonly pincode: string;

  @ApiProperty({
    description: 'country of the doctor',
    example: 'India'
  })
  @IsString()
  readonly country: string;
}

export class DoctorPrfDto {
  @ApiProperty()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsEmail()
  gender: string;

  @ApiProperty()
  @IsBoolean()
  isVerified: boolean;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  contactNumber: number;

  @ApiProperty()
  @IsNumber()
  fees: number;
  
  @ApiProperty()
  @IsString()
  specialization: string;

  @ApiProperty()
  @IsObject()
  location: string[];


  @ApiProperty()
  @IsString()
  stories: string;

  @ApiProperty()
  @IsString()
  title: string;
  


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
