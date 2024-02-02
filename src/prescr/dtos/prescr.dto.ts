import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PrescriptionDTO {

    @ApiProperty()
    @IsString() 
    doc_id: string;

    @ApiProperty()
    @IsString()  
    clinic_id: string;

    @ApiProperty()
    @IsString()  
    pat_id: string;

    @ApiProperty()
    @IsString()  
    appoi_day: string;

    @ApiProperty()
    @IsString()  
    appoi_time: string;

    @ApiProperty()
    Meds: string[];
  }