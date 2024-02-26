import { IsEmail, IsNotEmpty, IsString, IsOptional } from "class-validator";

import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsHTML(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsHTML',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const htmlRegex = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
          return typeof value === 'string' && htmlRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Text ($value) must be a valid HTML string';
        }
      }
    });
  };
}

export class register_Dto {
  @IsHTML()
  name: string;

  @IsNotEmpty()
  @IsEmail() 
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  user_Type: string;

  // @IsString()
  hashed_rt: string;

  @IsOptional()
  @IsString()
  picture: string;
}

export class update_Dto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  user_Type?: string;

  @IsOptional()
  @IsString()
  hashed_rt?: string;

  @IsOptional()
  @IsString()
  picture?: string;
}

export class login_Dto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
