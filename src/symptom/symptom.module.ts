import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Symptom, SymptomSchema } from './symptom.schema';
import { AIService } from '../ai/ai.service';
import { SymptomService } from './symptom.service';
import { SymptomResolver } from './symptom.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: Symptom.name, schema: SymptomSchema }])],
  providers: [AIService, SymptomService, SymptomResolver],
})
export class SymptomModule {}