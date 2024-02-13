// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, HydratedDocument } from 'mongoose';

// export type specializationSchema = HydratedDocument<SpecializationSchema>

// @Schema({collection:"specializationschema"})
// export class SpecializationSchema extends Document {
  
//   @Prop()
//   specialization_name: string;

//   @Prop()
//   LevelOfDifficulty: string;

//   @Prop()
//   doc_id:string[];

// }

// export const specSchema = SchemaFactory.createForClass(SpecializationSchema);
// specialization.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: "specializationschema" }) // Updated collection name
export class Specialization extends Document {
  @Prop({ required: true })
  specialization_name: string;

  @Prop()
  LevelOfDifficulty: string;

  @Prop({ type: [{ type: String }] }) // Array of strings
  doc_id: string[];
}

export const SpecializationSchema = SchemaFactory.createForClass(Specialization);
