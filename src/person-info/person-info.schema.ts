import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PersonInfoDocument = PersonInfo & Document;

@Schema()
export class PersonInfo {
  @Prop({ required: true })
  age: number;

  @Prop({ required: true, enum: ['male', 'female', 'other'] })
  gender: string;

  @Prop({ default: 'EN', enum: ['EN', 'VI'] })
  locale: string;

  @Prop({ default: Date.now })
  created_datetime: Date;

  @Prop({ required: true, unique: true })
  uuid: string;
}

export const PersonInfoSchema = SchemaFactory.createForClass(PersonInfo);