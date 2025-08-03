import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Symptom, SymptomDocument } from './symptom.schema';
import { Model } from 'mongoose';
import { SymptomInput } from './symptom.type';
import { AIService } from 'src/ai/ai.service';

@Injectable()
export class SymptomService {
  constructor(
    @InjectModel(Symptom.name)
    private model: Model<SymptomDocument>,
    private readonly aiService: AIService
  ) {}

  async create(input: SymptomInput): Promise<Symptom> {
    return this.model.create(input);
  }

  async findAll(): Promise<Symptom[]> {
    let data: Symptom[] = [];
    
    try{
      data = await this.model.find().exec();
    } catch (error) {
      console.error('Error fetching symptoms:', error);
    }

    return data;
  }

  async findBySeverity(severity: number): Promise<Symptom[]> {
    return this.model.find({ severity }).exec();
  }

  async consultant(input: string): Promise<String> {
    const result = await this.aiService.analyzeSymptoms(input);
    return  result;//symptom.save();
  }
}