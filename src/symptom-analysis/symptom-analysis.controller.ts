import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SymptomAnalysisService } from './symptom-analysis.service';
import { AnalyzeSymptomsDto } from './symptom-analysis.dto';

@ApiTags('AI Analysis')
@Controller('symptom-analysis')
export class SymptomAnalysisController {
  constructor(private readonly symptomAnalysisService: SymptomAnalysisService) {}

  @Post('analyze')
  @ApiOperation({ summary: 'Analyze symptoms from conversation' })
  @ApiResponse({ status: 200, description: 'Symptom analysis completed' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async analyzeSymptoms(@Body(ValidationPipe) dto: AnalyzeSymptomsDto) {
    return this.symptomAnalysisService.analyzeSymptoms(dto);
  }
}