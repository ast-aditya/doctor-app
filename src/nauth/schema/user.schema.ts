import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ timestamps: true })
export class User {
  @Prop()
  googleId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  mobileNumber: string;

  @Prop({ type: String })
  profilePictureUrl: string;

  @Prop({ required: true })
  verified: boolean;

  @Prop({ type: String })
  otp: string;

  @Prop()
  status: string;
  //by default active
  //if a user in inactive , wont be able to login
}

export const UserSchema = SchemaFactory.createForClass(User);