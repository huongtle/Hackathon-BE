import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type SymptomDocument = Symptom & Document;

@Schema()
@ObjectType()
export class Symptom {
  @Field()
  @Prop({ required: true, unique: true })
  name: string;

  @Field()
  @Prop({ required: true })
  englishName: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field({ nullable: true })
  @Prop()
  descriptionEn?: string;

  @Field()
  @Prop({ required: true, enum: [1, 2, 3] }) // 1=Nhẹ, 2=Trung bình, 3=Nghiêm trọng
  severity: number;
}

export const SymptomSchema = SchemaFactory.createForClass(Symptom);