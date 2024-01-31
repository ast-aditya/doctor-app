// doctorProfile.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'doctoruserssc'} )
export class DoctorProfile extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  contactNumber: string;

  @Prop()
  specialization: string;

  @Prop()
  location:string[]; 
  // {
    // address: string;
    // coordinates: {
    //   latitude: number;
    //   longitude: number;
    // };
  // };

  @Prop()
  education: Array<{
    degree: string;
    university: string;
    year: number;
  }>;

  @Prop()
  affiliations: string[];

  @Prop()
  experience: Array<{
    position: string;
    organization: string;
    duration: string;
  }>;
}

export const DoctorProfileSchema = SchemaFactory.createForClass(DoctorProfile);
