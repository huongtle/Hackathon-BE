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
      return `1. Nghỉ ngơi nhiều hơn để cơ thể có thể đối phó với bệnh tình.
        2. Uống đủ nước để duy trì sự lỏng lẻo và giúp loại bỏ độc tố khỏi cơ thể.
        3. Sử dụng thuốc hạ nhiệt và giảm đau như paracetamol để giảm sốt và cảm giác đau.
        4. Hạn chế tiếp xúc với người khác để ngăn chéo vi rút hoặc vi khuẩn cho người khác.

        Tuy nhiên, nếu triệu chứng của bạn trở nên nặng hơn hoặc bạn cảm thấy không khỏe hơn, bạn cần thăm khám bác sĩ ngay lập tức để được đánh giá chính xác và điều trị kịp thời.`;
      // const response = await this.openai.chat.completions.create({
      //   model: 'gpt-3.5-turbo',
      //   messages: [
      //     {
      //       role: 'user',
      //       content: `Symptoms: ${symptoms} .Based on symptoms, suggest possible conditions.`,
      //     }
      //   ],
      // });
  
      //return response.choices[0]?.message?.content?.trim() || 'No result';
    } catch (err) {
      if (err.status === 429) {
        console.log('OpenAI quota exceeded. Please check your billing account.');
      }

      return 'Error analyzing symptoms';
    }
  }
}