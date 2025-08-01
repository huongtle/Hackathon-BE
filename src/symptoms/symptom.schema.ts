import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Symptom extends Document {
  @Prop()
  input: string;

  @Prop()
  result: string;
}

export const SymptomSchema = SchemaFactory.createForClass(Symptom);