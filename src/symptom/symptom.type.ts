
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SymptomInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  severity: number; // 1, 2, 3
}