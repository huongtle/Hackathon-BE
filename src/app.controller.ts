import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AIService } from './ai/ai.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly aiService: AIService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('analyze-symptoms')
  async analyzeSymptoms(
    @Body('symptoms') symptoms: string,
    @Body('locale') locale: string,
  ): Promise<string> {
    //
    return this.aiService.analyzeSymptoms(symptoms);
  }
}
