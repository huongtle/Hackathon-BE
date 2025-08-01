import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async analyzeSymptoms(symptoms: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a medical assistant. Based on symptoms, suggest possible conditions.',
          },
          {
            role: 'user',
            content: `Symptoms: ${symptoms}`,
          },
        ],
      });
  
      return response.choices[0]?.message?.content?.trim() || 'No result';
    } catch (err) {
      if (err.status === 429) {
        console.log('OpenAI quota exceeded. Please check your billing account.');
      }

      return 'Error analyzing symptoms';
    }
  }
}