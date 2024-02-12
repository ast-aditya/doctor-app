import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Doc_address {
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

export const AddressSchema = SchemaFactory.createForClass(Doc_address);

export class Education {
  @Prop({ required: true })
  degree: string;

  @Prop({ required: true })
  university: string;

  @Prop({ required: true })
  year: number;
}

export const EducationSchema = SchemaFactory.createForClass(Education);

export class Experience {

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true })
  organization: string;

  @Prop({ required: true })
  start_Year: number;

  @Prop({ required: true })
  end_Year: number;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);

@Schema({ collection: 'doctoruserscs' })
export class DoctorProfile extends Document {

  @Prop()
  user_Id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ required: true })
  @Prop()
  gender: string;

  @Prop({ required: true })
  dob: Date;

  @Prop({ type: AddressSchema, required: true })
  address: Doc_address;

  @Prop({type: EducationSchema, required: true})
  education: Education[];

  @Prop({ required: true })
  country_Code: string;

  @Prop({ required: true })
  contact: number;

  @Prop()
  isVerified: boolean;

  @Prop()
  description: string;

  @Prop()
  fees: number;

  @Prop()
  stories: {
    title: String,
    tags: [String], 
    description: String;
  }

  @Prop()
  specialization: string[];

  @Prop({ type: EducationSchema, required: true })
  Education: Education;
  
  @Prop([String])
  affiliations: string[];

  @Prop()
  total_experience: number;

  @Prop()
  @Prop({ type: ExperienceSchema, required: true })
  experience: Experience;


  @Prop()
  Online_Schedule:{
    Monday: [{ startTime: String, endTime: String }],
    Tuesday: [{ startTime: String, endTime: String }],
    Wedndesday: [{ startTime: String, endTime: String }],
    Thirsday: [{ startTime: String, endTime: String }],
    Friday: [{ startTime: String, endTime: String }];
  }

  @Prop()
  clinics: {
    clinicID: 'ObjectId',
      name: String,
      address: String,
      contactNumber: String,
      email: String,
      Schedule: {
        Monday: [{ startTime: String, endTime: String }],
      Tuesday: [{ startTime: String, endTime: String }],
      Wedndesday: [{ startTime: String, endTime: String }],
      Thirsday: [{ startTime: String, endTime: String }],
      Friday: [{ startTime: String, endTime: String }];
        
      },
  }

  @Prop()
  registrations: string;

  @Prop()
  slug: string;

  @Prop()
  profile_image: string;

  @Prop()
  awards_and_recognition: string[];

  @Prop()
  total_appointment_num: number;

  @Prop()
  numOfReviews: number;

  @Prop()
  rating: number;

}
