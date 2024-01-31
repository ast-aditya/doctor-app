import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({collection : 'users'})
export class UserLogin extends Document {
  @Prop({required : true})
  username: string;

  @Prop({required : true})
  password: string;

}

export const UserLoginSchema = SchemaFactory.createForClass(UserLogin);
