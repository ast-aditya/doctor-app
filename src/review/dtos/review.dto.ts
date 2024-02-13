import { IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Story } from '../schemas/review.schema';


export class ReviewDto {
  @ApiProperty()
  @IsString()
  clinic_id: string;

  @ApiProperty()
  @IsString()
  patient_id: string;

  @ApiProperty()
  @IsString()
  patient_name: string;

  @ApiProperty()
  @IsString()
  doctor_id: string;

  @ApiProperty()
  story: Story;

  @ApiProperty()
  @IsString()
  rating: string;

  @ApiProperty()
  @IsBoolean()
  isVerified: boolean;
}