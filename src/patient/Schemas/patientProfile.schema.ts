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

  @Prop()
  user_Id : string;

  @Prop()
  name : string;

  @Prop()
  email : string;

  @Prop()
  role : string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  dob: Date;

  @Prop()
  Idenfication : string;

  @Prop()
  Idenfication_value : string;

  @Prop()
  blood_grp : string;


  @Prop({ type: AddressSchema, required: true }) // use the Address schema
  address: Address;

  @Prop({ required: true })
  country_code: string;

  @Prop({ required: true })
  contact: number;
}

export const PatientProfileSchema = SchemaFactory.createForClass(PatientProfile);