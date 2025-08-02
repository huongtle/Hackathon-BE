import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type SymptomSeverityDocument = SymptomSeverity & Document;

@Schema()
@ObjectType()
export class SymptomSeverity {
  @Field()
  @Prop({ required: true, unique: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field()
  @Prop({ required: true, enum: [1, 2, 3] }) // 1=Nhẹ, 2=Trung bình, 3=Nghiêm trọng
  severity: number;
}

export const SymptomSeveritySchema = SchemaFactory.createForClass(SymptomSeverity);