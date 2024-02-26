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
  pincode: string;

  @Prop()
  country: string;
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

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  dob: Date;

  @Prop()
  identification_Type : string;

  @Prop()
  identification_Value : string;

  @Prop({required:true})
  blood_Group : string;

  @Prop({ type: AddressSchema, required: true }) // use the Address schema
  address: Address;

  @Prop({ required: true })
  country_Code: string;

  @Prop({ required: true })
  contact: number;

  @Prop({default: false})
  is_Deleted: boolean;
}

export const PatientProfileSchema = SchemaFactory.createForClass(PatientProfile);