import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop()
  name: string;
  @Prop()
  totalAmount: number;
  @Prop()
  income: [{ userId: string; amount: number; userName: string }];
  @Prop()
  id: string;
  @Prop()
  date: Date;
  @Prop()
  userGroup: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
