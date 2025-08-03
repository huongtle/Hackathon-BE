import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SeverityLevel } from '../common/enums/severity.enum';

@ObjectType()
export class SeverityInfo {
  @Field(() => SeverityLevel)
  level: SeverityLevel;

  @Field()
  name: string;

  @Field()
  nameEn: string;

  @Field()
  description: string;

  @Field()
  descriptionEn: string;
}