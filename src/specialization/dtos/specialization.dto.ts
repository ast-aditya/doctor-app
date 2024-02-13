// import { IsString } from "class-validator";
// import { ApiProperty } from "@nestjs/swagger";

// export class specialDTO {

//     // @ApiProperty()
//     // @IsString() 
//     // specialization_id: string;

//     @ApiProperty()
//     @IsString()  
//     specialization_name: string;

//     @ApiProperty()
//     @IsString()  
//     LevelOfDifficulty: string;

//     @ApiProperty()
//     // @IsString()
//     doc_id:string[];
//   }
// specialization.dto.ts

import { IsString, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SpecialDTO {
  @ApiProperty()
  @IsString()
  specialization_name: string;

  @ApiProperty()
  @IsString()
  LevelOfDifficulty: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  doc_id: string[];
}
