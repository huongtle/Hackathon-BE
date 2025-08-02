import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SymptomSeverity, SymptomSeverityDocument } from './symptom-severity.schema';
import { Model } from 'mongoose';
import { SymptomSeverityInput } from './symptom-severity.type';

@Injectable()
export class SymptomSeverityService {
  constructor(
    @InjectModel(SymptomSeverity.name)
    private model: Model<SymptomSeverityDocument>
  ) {}

  async create(input: SymptomSeverityInput): Promise<SymptomSeverity> {
    return this.model.create(input);
  }

  async findAll(): Promise<SymptomSeverity[]> {
    return this.model.find().exec();
  }

  async findBySeverity(severity: number): Promise<SymptomSeverity[]> {
    return this.model.find({ severity }).exec();
  }
}