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
  gender: string;

  @Prop({ required: true })
  dob: Date;

  @Prop({required:true})
  specialization: string[];

  @Prop({ type: AddressSchema, required: true }) // use the Address schema
  address: Address;

  @Prop({type: EducationSchema, required: true})
  education: Education[];

  @Prop({type: ExperienceSchema, required: true})
  experience: Experience[];

  @Prop({ required: true })
  country_Code: string;

  @Prop({ required: true })
  contact: number;
}

export const DoctorProfileSchema = SchemaFactory.createForClass(DoctorProfile);


// // doctorProfile.schema.ts
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, HydratedDocument } from 'mongoose';

// export type DoctorDocument = HydratedDocument<DoctorProfile>

// @Schema({ collection: 'doctoruserscs'} )

// export class DoctorProfile extends Document {
//   @Prop()
//   doc_id: string;
  
//   @Prop()
//   firstName: string;

//   @Prop()
//   lastName: string;

//   @Prop()
//   email: string;

//   @Prop()
//   password: string;

//   @Prop()
//   contactNumber: number;

//   @Prop()
//   specialization: string;

//   @Prop()
//   location:string[]; 

// @Prop()
// affiliations: string[];

  // @Prop()
  // education: Array<{
  //   degree: string;
  //   university: string;
  //   year: number;
  // }>;


  // @Prop()
  // experience: Array<{
  //   position: string;
  //   organization: string;
  //   duration: string;
  // }>;
// }

// export const DoctorProfileSchema = SchemaFactory.createForClass(DoctorProfile);
