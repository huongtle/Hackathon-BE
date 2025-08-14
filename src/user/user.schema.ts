import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserInformation extends Document {
  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  gender: string;

  @Prop({ default: Date.now })
  created_datetime: Date;

  @Prop({ required: true })
  session_id: string;
}

export const UserInformationSchema = SchemaFactory.createForClass(UserInformation);