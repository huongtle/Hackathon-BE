import { registerEnumType } from '@nestjs/graphql';

export enum SeverityLevel {
  MILD = 1,
  MODERATE = 2,
  SEVERE = 3,
}

registerEnumType(SeverityLevel, {
  name: 'SeverityLevel',
  description: 'Mức độ nghiêm trọng của triệu chứng',
});