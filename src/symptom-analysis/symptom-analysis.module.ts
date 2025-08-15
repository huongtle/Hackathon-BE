import { Module } from '@nestjs/common';
import { SymptomAnalysisController } from './symptom-analysis.controller';
import { SymptomAnalysisService } from './symptom-analysis.service';
import { AIService } from '../ai/ai.service';

@Module({
  controllers: [SymptomAnalysisController],
  providers: [SymptomAnalysisService, AIService],
})
export class SymptomAnalysisModule {}