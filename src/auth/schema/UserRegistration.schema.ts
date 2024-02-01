// user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({collection : 'users'})
export class UserRegister extends Document {
  @Prop({required : true})
  username: string;

  @Prop({required : true})
  password: string;

  @Prop({required : true})
  role : string;

  @Prop()
  otp: string;

  @Prop({default : false})
  isVerified: boolean;
}

export const UserRegistrationSchema = SchemaFactory.createForClass(UserRegister);
