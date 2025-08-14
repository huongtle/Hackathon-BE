import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AIService } from './ai/ai.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly aiService: AIService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get hello message' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('analyze-symptoms')
  @ApiOperation({ summary: 'Analyze symptoms using AI' })
  async analyzeSymptoms(
    @Body('symptoms') symptoms: string,
    @Body('locale') locale: string,
  ): Promise<string> {
    //
    return this.aiService.analyzeSymptoms(symptoms);
  }
}
