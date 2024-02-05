import { IsString, IsArray, ValidateNested } from 'class-validator';
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
}

export class ClinicDTO {
    @ApiProperty()
    @IsString()
    clinic_id: string;

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

    @ApiProperty()
    @IsString()
    open_days: string[];

    @ApiProperty()
    @IsString()
    opening_time: string;


    @ApiProperty()
    @IsString()
    closing_time: string;
}
