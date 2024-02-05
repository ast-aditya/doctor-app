// doctorProfile.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type DoctorDocument = HydratedDocument<DoctorProfile>

@Schema({ collection: 'doctoruserscs'} )

export class DoctorProfile extends Document {
  @Prop()
  doc_id: string;
  
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  contactNumber: number;

  @Prop()
  specialization: string;

  @Prop()
  location:string[]; 


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
