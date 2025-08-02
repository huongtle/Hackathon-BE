import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SymptomSeverity, SymptomSeveritySchema } from './symptom-severity.schema';
import { SymptomSeverityService } from './symptom-severity.service';
import { SymptomSeverityResolver } from './symptom-severity.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: SymptomSeverity.name, schema: SymptomSeveritySchema }])],
  providers: [SymptomSeverityService, SymptomSeverityResolver],
})
export class SymptomSeverityModule {}