import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, IsObject, IsNumber, ArrayMinSize } from 'class-validator';

class Address {
  @ApiProperty()
  @IsString()
  line1: string;

  @ApiProperty()
  @IsString()
  line2?: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNumber()
  pincode: string;

  @ApiProperty()
  @IsString()
  country: string;
}

class Education {
  @ApiProperty()
  @IsString()
  degree: string;

  @ApiProperty()
  @IsString()
  university: string;

  @ApiProperty()
  @IsNumber()
  year: number;
}

class Experience {
  @ApiProperty()
  @IsString()
  designation: string;

  @ApiProperty()
  @IsString()
  organization: string;

  @ApiProperty()
  @IsNumber()
  start_Year: number;

  @ApiProperty()
  @IsNumber()
  end_Year: number;
}

export class DoctorPrfDto {
  @ApiProperty()
  @IsString()
  user_Id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsString()
  dob: Date;

  @ApiProperty()
  @IsArray()
  specialization: string[];

  @ApiProperty()
  @IsObject()
  address: Address;

  @ApiProperty()
  @IsArray()
  education: Education[];

  @ApiProperty()
  @IsArray()
  experience: Experience[];

  @ApiProperty()
  @IsString()
  country_Code: string;

  @ApiProperty()
  @IsNumber()
  contact: number;
}


// // doctorprf.dto.ts
// import { ApiProperty } from '@nestjs/swagger';
// import { IsString, IsEmail, IsArray, IsObject, IsNumber, ArrayMinSize } from 'class-validator';

// export class DoctorPrfDto {
//   @ApiProperty()
//   @IsString()
//   doc_id: string;

//   @ApiProperty()
//   @IsString()
//   firstName: string;

//   @ApiProperty()
//   @IsString()
//   lastName: string;

//   @ApiProperty()
//   @IsEmail()
//   email: string;



//   @ApiProperty()
//   @IsString()
//   password: string;

//   @ApiProperty()
//   @IsNumber()
//   contactNumber: number;

//   @ApiProperty()
//   @IsString()
//   specialization: string;

//   @ApiProperty()
//   @IsObject()
//   location: string[];
  

//   @ApiProperty()
//   @IsArray()
//   @ArrayMinSize(1)
//   education: Array<{
//     degree: string;
//     university: string;
//     year: number;
//   }>;

//   @ApiProperty()
//   @IsArray()
//   affiliations: string[];

//   @ApiProperty()
//   @IsArray()
//   experience: Array<{
//     position: string;
//     organization: string;
//     duration: string;
//   }>;
// }
