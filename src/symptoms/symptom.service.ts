import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Symptom } from './symptom.schema';
import { Model } from 'mongoose';
import { AIService } from '../ai/ai.service';
import { SymptomType } from './symptom.type';

@Injectable()
export class SymptomService {
  constructor(
    //@InjectModel(Symptom.name) private symptomModel: Model<Symptom>,
    private readonly aiService: AIService,
  ) {}

  async consultant(input: string): Promise<SymptomType> {
    const result = await this.aiService.analyzeSymptoms(input);
    console.log('AI result:', result);
    // const symptom = new this.symptomModel({ input, result });
    return  { input, result };//symptom.save();
  }

  async findAll(): Promise<Symptom[]> {
    return [];//this.symptomModel.find().exec();
  }
}
