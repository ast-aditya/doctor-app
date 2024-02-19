import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;


@Schema({collection : 'users'})
export class User extends Document {

  // @Prop()
  // sub: string;

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
}

export const UserSchema = SchemaFactory.createForClass(User);
