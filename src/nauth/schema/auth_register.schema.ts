import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<AuthUserRegister>;

@Schema({collection : 'users'})
export class AuthUserRegister extends Document {

  @Prop({type: String})
  name : string;

  @Prop({required : true , unique: true})
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;

  @Prop()
  hashed_rt: string;
}

export const AuthUserRegistrationSchema = SchemaFactory.createForClass(AuthUserRegister);
