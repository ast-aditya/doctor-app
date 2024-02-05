import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthRegisterDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
}