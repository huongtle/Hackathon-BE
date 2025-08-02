import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SymptomSeverityService } from './symptom-severity.service';
import { SymptomSeverity } from './symptom-severity.schema';
import { SymptomSeverityInput } from './symptom-severity.type';

@Resolver(() => SymptomSeverity)
export class SymptomSeverityResolver {
  constructor(private readonly service: SymptomSeverityService) {}

  @Mutation(() => SymptomSeverity)
  createSymptomSeverity(@Args('input') input: SymptomSeverityInput) {
    return this.service.create(input);
  }

  @Query(() => [SymptomSeverity])
  symptomSeverities() {
    return this.service.findAll();
  }

  @Query(() => [SymptomSeverity])
  symptomSeveritiesByLevel(@Args('severity', { type: () => Int }) severity: number) {
    return this.service.findBySeverity(severity);
  }
}