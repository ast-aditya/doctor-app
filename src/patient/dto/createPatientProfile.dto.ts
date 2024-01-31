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

  @ApiProperty()
  @IsInt()
  readonly pincode: number;
}

export class createPatientProfile {
  @ApiProperty({
    description: 'first name of the patient',
    example: 'test'
  })
  @IsString()
  readonly firstname: string; 

  @ApiProperty({
    description: 'second name of the patient',
    example: 'user'
  })
  @IsString()
  @IsOptional()
  readonly secondname?: string;

  @ApiProperty({
    description: 'age of the patient',
    example: 18
  })
  @IsInt()
  readonly age: number;

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
  // @IsDate()
  readonly dob: Date;

  @ApiProperty({
    description: 'address of the patient',
  })
  readonly address: Address;

  @ApiProperty({
    description: 'contact number of the patient',
    example: '1234567890'
  })
  @IsInt()
  readonly contact: number;
}
