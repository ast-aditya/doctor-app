import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document ,HydratedDocument} from 'mongoose';

export interface Story {
  title: string;
  description: string;
}

@Schema({ collection: "reviewschema" })
export class Review extends Document {
  @Prop({ required: true })
  clinic_id: string;

  @Prop({ required: true })
  patient_id: string;

  @Prop({ required: true })
  patient_name: string;

  @Prop({ required: true })
  doctor_id: string;

  @Prop({ required: true, type: Object })
  story: Story;

  @Prop({ required: true })
  rating: string;

  @Prop({ default: false })
  isVerified: boolean;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);