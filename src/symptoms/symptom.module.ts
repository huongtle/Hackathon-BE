import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Symptom, SymptomSchema } from './symptom.schema';
import { SymptomService } from './symptom.service';
import { SymptomResolver } from './symptom.resolver';
import { AIService } from '../ai/ai.service';

@Module({
  // imports: [
  //   MongooseModule.forFeature([{ name: Symptom.name, schema: SymptomSchema }]),
  // ],
  providers: [SymptomService, SymptomResolver, AIService],
})
export class SymptomModule {}