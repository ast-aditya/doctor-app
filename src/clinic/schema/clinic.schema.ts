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


@Schema({ collection: 'clinic' })
export class clinicSchema extends Document {

@Prop()
clinic_id: string;

@Prop()
Clinic_name: string;

@Prop({ type: AddressSchema, required: true })
Address: Address;

@Prop()
DoctorIDs: string[];

@Prop()
open_days: string[];

@Prop()
opening_time: string;

@Prop()
closing_time: string;


}

export const clinicschema = SchemaFactory.createForClass(clinicSchema);