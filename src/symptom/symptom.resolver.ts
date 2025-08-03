import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SymptomService } from './symptom.service';
import { Symptom } from './symptom.schema';
import { SymptomInput } from './symptom.type';

@Resolver(() => Symptom)
export class SymptomResolver {
  constructor(private readonly service: SymptomService) {}

  @Mutation(() => Symptom)
  createSymptom(@Args('input') input: SymptomInput) {
    return this.service.create(input);
  }

  @Mutation(() => String)
  async consultant(@Args('input') input: string) {
    console.log('Received input:', input);
    return this.service.consultant(input);
  }

  @Query(() => [Symptom])
  symptoms() {
    return this.service.findAll();
  }

  @Query(() => [Symptom])
  symptomByLevel(@Args('severity', { type: () => Int }) severity: number) {
    return this.service.findBySeverity(severity);
  }
}