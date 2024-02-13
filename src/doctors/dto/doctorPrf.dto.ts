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
  @ApiProperty()
  @IsString()
  readonly country: string;
}

export class EducationDto{
  @ApiProperty({
    description: 'degree of the doctor',
    example: 'MD/ MBBS'
  })
  @IsString()
  degree: string;

  @ApiProperty({
    description: 'University of the doctor',
    example: 'AIIMS'
  })
  @IsString()
  university: string;

  @ApiProperty({
    description: 'year of the doctor completing his degree',
    example: '2024'
  })
  @IsString()
  year: string;
}

export class ExperienceDto{
  @ApiProperty()
  @IsString()
  designation: string;

  @ApiProperty()
  @IsString()
  organisation: string;

  @ApiProperty()
  @IsString()
  start_year: string;

  @ApiProperty()
  @IsString()
  end_year: string;
}

export class storiesDto{
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  tags: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class DoctorPrfDto {
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
  address: Doc_address;

  @ApiProperty()
  @IsArray()
  affiliations: string[];

  @ApiProperty()
  experience: ExperienceDto;

  @ApiProperty()
  Education: EducationDto;

  @ApiProperty()
  stories: storiesDto;
  

}
