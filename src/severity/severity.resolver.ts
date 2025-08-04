import { Resolver, Query } from '@nestjs/graphql';
import { SeverityService } from './severity.service';
import { SeverityInfo } from './severity.type';

@Resolver(() => SeverityInfo)
export class SeverityResolver {
  constructor(private readonly severityService: SeverityService) {}

  @Query(() => [SeverityInfo])
  severities(): SeverityInfo[] {
    return this.severityService.getSeverities();
  }
}