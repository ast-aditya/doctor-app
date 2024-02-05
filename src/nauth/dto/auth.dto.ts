import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class register_Dto{

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    role: string;
}
export class update_Dto{

    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsEmail()
    email?: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    role?: string;
}
export class login_Dto{
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
}