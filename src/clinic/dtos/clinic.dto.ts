import { IsString, IsArray, ValidateNested, IsInt, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
class AddressDTO {
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
    @IsString()
    pincode: number;

    @ApiProperty()
    @IsString()
    country: string;
}

export class ClinicDTO {

    @ApiProperty()
    @IsString()
    Clinic_name: string;

    @ApiProperty()
    @ValidateNested()
    @Type(() => AddressDTO)
    Address: AddressDTO;

    @ApiProperty()
    @IsArray()
    DoctorIDs: string[];

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    open_days: string[];

    @ApiProperty()
    @IsString()
    opening_time: string;

    @ApiProperty()
    @IsString()
    closing_time: string;

    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsString()
    country_Code : string;

    @ApiProperty()
    @IsInt()
    contact_Number: number;

}
