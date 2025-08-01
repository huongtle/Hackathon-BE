import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class SymptomType {
  @Field({ nullable: true })
  input: string;

  @Field({ nullable: true })
  result: string;
}