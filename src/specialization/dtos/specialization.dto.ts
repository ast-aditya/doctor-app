import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class specialDTO {

    // @ApiProperty()
    // @IsString() 
    // specialization_id: string;

    @ApiProperty()
    @IsString()  
    specialization_name: string;

    @ApiProperty()
    @IsString()  
    LevelOfDifficulty: string;

    @ApiProperty()
    // @IsString()
    doc_id:string[];
  }