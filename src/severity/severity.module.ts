import { Module } from '@nestjs/common';
import { SeverityService } from './severity.service';
import { SeverityResolver } from './severity.resolver';

@Module({
  imports: [],
  providers: [SeverityService, SeverityResolver],
})
export class SeverityModule {}