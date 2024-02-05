import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type specializationSchema = HydratedDocument<SpecializationSchema>

@Schema({collection:"prescrschemas"})
export class SpecializationSchema extends Document {
  
  @Prop()
  specialization_id: String;
  
  @Prop()
  specialization_name: string;

  @Prop()
  LevelOfDifficulty: string;

  @Prop()
  doc_id:string[];

}

export const specSchema = SchemaFactory.createForClass(SpecializationSchema);