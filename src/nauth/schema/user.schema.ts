import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;


@Schema({collection : 'users'})
export class User extends Document {

  @Prop({type: String})
  name : string;

  @Prop({required : true , unique: true})
  email: string;

  @Prop()
  password: string;

  @Prop({type: String })
  user_Type: string;

  @Prop()
  hashed_rt: string;

  @Prop()
  picture : string; 

  @Prop({default: false})
  is_Verified: boolean;

  @Prop({default: false})
  is_Deleted: boolean;

  @Prop()
  hashedOtp: string;

  @Prop()
  otpExpires: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
