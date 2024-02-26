import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class Address {
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
    description: 'city of the patient',
    example: 'Noida'
  })

  @IsString()
  readonly city: string;

  @ApiProperty({
    description: 'state of the patient',
    example: 'Uttar Pradesh'
  })
  @IsString()
  readonly state: string;

  @ApiProperty({
    description: 'pincode of the patient',
    example: '201304'
  })
  @IsInt()
  readonly pincode: string;

  @ApiProperty({
    description: 'country of the patient',
    example: 'India'
  })
  @IsInt()
  readonly country: string;
}

export class createPatientProfile {

  readonly user_id : string;
  @ApiProperty({
    description: 'age of the patient',
    example: 18
  })
  // @IsInt()
  // readonly age: number;

  @ApiProperty({
    description: 'gender of the patient',
    example: 'male'
  })
  @IsString()
  readonly gender: string;

  @ApiProperty({
    description: 'date of birth of the patient',
    example: '07-12-2002'
  })
  readonly dob: Date;

  @ApiProperty({
    description: 'Identification type of the patient',
  })
  readonly identification_Type: string;

  @ApiProperty({
    description: 'Identification value of the patient',
  })
  readonly identification_Value: string;

  @ApiProperty({
    description: 'blood group of the patient',
  })
  readonly blood_Group: string;

  @ApiProperty({
    description: 'address of the patient',
  })
  readonly address: Address;

  @ApiProperty({
    description: 'Contact country code of the patient',
  })
  readonly country_Code: string;

  @ApiProperty({
    description: 'contact number of the patient',
    example: '1234567890'
  })
  @IsInt()
  readonly contact: number;
}
