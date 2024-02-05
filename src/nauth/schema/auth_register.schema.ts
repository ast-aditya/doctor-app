import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<AuthUserRegister>;

@Schema({collection : 'users'})
export class AuthUserRegister extends Document {

  @Prop({type: String})
  name : string;

  @Prop({required : true , unique: true})
  email: string;

  @Prop({required : true})
  password: string;

  @Prop({type: String })
  role: string;

  @Prop()
  hashed_rt: string;

//   @Prop()
//   otp: string;

//   @Prop({default : false})
//   isVerified: boolean;
}

export const AuthUserRegistrationSchema = SchemaFactory.createForClass(AuthUserRegister);
