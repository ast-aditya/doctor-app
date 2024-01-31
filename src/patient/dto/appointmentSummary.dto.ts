import { IsString, IsNotEmpty, IsArray, IsObject } from 'class-validator';

export class SummaryDTO {
  @IsNotEmpty()
  @IsString()
  symptoms: string;

  @IsNotEmpty()
  @IsArray()
  prescribedMedications: string[];

  @IsString()
  additionalNotes: string;
}
