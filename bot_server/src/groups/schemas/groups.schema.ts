import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  @Prop()
  name: string;
  @Prop()
  currency: string;
  @Prop()
  users: [
    {
      userName: string;
      userId: string;
    },
  ];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
