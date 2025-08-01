import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SymptomService } from './symptom.service';
import { Symptom } from './symptom.schema';
import { SymptomType } from './symptom.type';

@Resolver(() => SymptomType)
export class SymptomResolver {
  constructor(private readonly symptomService: SymptomService) {}

  @Query(() => [SymptomType])
  async symptoms() {
    return [];//this.symptomService.findAll();
  }

  @Mutation(() => SymptomType)
  async consultant(@Args('input') input: string) {
    console.log('Received input:', input);
    return this.symptomService.consultant(input);
  }
}