import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class appointmentSummary extends Document {
  @Prop({ required: true })
  symptoms: { type: String, required: true };
  
  @Prop({ required: true })
  prescribedMedications: { type: [String], required: true };

  @Prop({ required: true })
  additionalNotes: String;

}

export const appointmentSummarySchema = SchemaFactory.createForClass(appointmentSummary);
