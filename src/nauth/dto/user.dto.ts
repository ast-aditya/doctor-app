import { IsEmail, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class register_Dto {
  @IsNotEmpty()
  @IsString()
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

  @IsString()
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


// import { IsEmail, IsNotEmpty, IsString } from "class-validator";

// export class register_Dto{

//     @IsNotEmpty()
//     @IsString()
//     name: string;

//     @IsNotEmpty()
//     @IsEmail()
//     email: string;
  
//     @IsNotEmpty()
//     @IsString()
//     password: string;

//     // @IsNotEmpty()
//     // @IsString()
//     role: string;
// }
// export class update_Dto{

//     @IsNotEmpty()
//     @IsString()
//     name?: string;

//     @IsNotEmpty()
//     @IsEmail()
//     email?: string;
  
//     @IsNotEmpty()
//     @IsString()
//     password: string;

//     @IsNotEmpty()
//     @IsString()
//     role?: string;
// }
// export class login_Dto{
//     @IsNotEmpty()
//     @IsEmail()
//     email: string;
  
//     @IsNotEmpty()
//     @IsString()
//     password: string;
// }