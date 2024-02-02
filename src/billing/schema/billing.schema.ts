import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'billing' })
export class Billing extends Document {
  @Prop({ required: true })
  amountPaid: number;

  @Prop({ required: true })
  totalAmount: number;

  @Prop()
  discount?: number;

  @Prop()
  discountCoupon?: string;

  @Prop({ required: true })
  methodOfPayment: string;

  @Prop({ required: true })
  transactionStatus: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ required: true })
  patientID: string;

  @Prop({ required: true })
  doctorID: string;

  @Prop({ required: true })
  appointmentID: string;
}

export const BillingSchema = SchemaFactory.createForClass(Billing);
