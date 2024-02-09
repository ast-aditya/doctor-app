import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsPhoneNumber, IsOptional, IsArray } from "class-validator";

class Options {

    @IsNotEmpty()
    @IsString()
    googleId?: string;

    @IsNotEmpty()
    @IsString()
    profilePictureUrl?: string;

    @IsNotEmpty()
    @IsString()
    designation?: string;

    @IsNotEmpty()
    @IsString()
    industry?: string;

    @IsNotEmpty()
    @IsString()
    expertise?: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    interests?: string[];

    @IsNotEmpty()
    @IsString()
    otp?: string;

    @IsNotEmpty()
    @IsString()
    verified?: boolean;
   
    @IsNotEmpty()
    @IsString()
    refreshToken?: string | null;
  }
export class UpdateOptions extends Options {
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsString()
    email?: string;

    @IsNotEmpty()
    @IsString()
    password?: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    mobileNumber?: number;
    
  }
  export class UpdateUserDto {
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    id: string;
  
    @IsNotEmpty()
    @Type(() => UpdateOptions)
    options?: UpdateOptions;
  }