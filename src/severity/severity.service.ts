import { Injectable } from '@nestjs/common';
import { SeverityList } from '../common/constants/severity.constant';
import { SeverityInfo } from './severity.type';

@Injectable()
export class SeverityService {
  getSeverities(): SeverityInfo[] {
    return SeverityList;
  }
}