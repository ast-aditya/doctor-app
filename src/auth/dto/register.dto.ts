import { IsIn, IsString } from 'class-validator';

export class userRegistrationDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  @IsIn(['doctor', 'patient'])
  role: string;
}
