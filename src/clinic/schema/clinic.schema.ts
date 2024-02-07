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

    @Prop({ required: true })
    country: string;


  }
  
  export const AddressSchema = SchemaFactory.createForClass(Address);


@Schema({ collection: 'clinic' })
export class clinicSchema extends Document {

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

@Prop()
email : string;

@Prop()
contact_Number : number;

@Prop()
country_Code : string;

}

export const clinicschema = SchemaFactory.createForClass(clinicSchema);
