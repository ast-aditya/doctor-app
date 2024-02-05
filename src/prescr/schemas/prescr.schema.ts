import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type prescriptionschema = HydratedDocument<prescrSchema>

@Schema({collection:"prescrschemas"})
export class prescrSchema extends Document {
  @Prop()
  doc_id: string;

  @Prop()
  clinic_id: string;  

  @Prop()
  pat_id: string;

  @Prop()
  appoi_day: string;

  @Prop()
  appoi_time: string;

  @Prop()
  Meds: string[];

}

export const prescriptionSchema = SchemaFactory.createForClass(prescrSchema);