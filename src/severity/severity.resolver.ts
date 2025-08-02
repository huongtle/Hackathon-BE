import { Resolver, Query } from '@nestjs/graphql';
import { SeverityService } from './severity.service';
import { SeverityLevelInfo } from './severity.type';

@Resolver(() => SeverityLevelInfo)
export class SeverityResolver {
  constructor(private readonly severityService: SeverityService) {}

  @Query(() => [SeverityLevelInfo])
  getSymptomSeverityLevels(): SeverityLevelInfo[] {
    return this.severityService.getAllSeverityLevels();
  }
}