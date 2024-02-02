import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address {
  @Prop({ required: true })
  line1: string;

  @Prop()
  line2?: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  pincode: number;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ collection: 'patientusers' })
export class PatientProfile extends Document {
  @Prop({ required: true })
  username: string;

  // @Prop({ required: true })
  // password: string;

  @Prop({required: true})
  user_id : string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  secondname: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  dob: Date;

  @Prop({ type: AddressSchema, required: true }) // use the Address schema
  address: Address;

  @Prop({ required: true })
  contact: number;
}

export const PatientProfileSchema = SchemaFactory.createForClass(PatientProfile);
