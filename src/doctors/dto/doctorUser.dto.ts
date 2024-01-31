import { IsEmail, IsEmpty } from "class-validator";

export class DoctorUser{

    @IsEmail()
    username: string;

    @IsEmpty()
    password: string;
}