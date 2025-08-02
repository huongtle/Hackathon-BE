import { Injectable } from '@nestjs/common';
import { SeverityLevel } from '../common/enums/severity.enum';
import { SeverityLevelInfo } from './severity.type';

@Injectable()
export class SeverityService {
  getAllSeverityLevels(): SeverityLevelInfo[] {
    return [
      {
        level: SeverityLevel.MILD,
        name: 'Triệu chứng nhẹ',
        nameEn: 'Mild symptoms',
        description: 'Tự theo dõi tại nhà, thường không cần can thiệp y tế nếu không kéo dài.',
        descriptionEn: 'Self-monitor at home, usually does not require medical intervention unless prolonged.',
      },
      {
        level: SeverityLevel.MODERATE,
        name: 'Triệu chứng trung bình',
        nameEn: 'Moderate symptoms',
        description: 'Nên tham khảo ý kiến bác sĩ nếu kéo dài quá 48–72 giờ hoặc có dấu hiệu xấu đi.',
        descriptionEn: 'Consult a doctor if it lasts more than 48–72 hours or worsens.',
      },
      {
        level: SeverityLevel.SEVERE,
        name: 'Triệu chứng nghiêm trọng – cần can thiệp y tế khẩn cấp',
        nameEn: 'Severe symptoms – require emergency medical attention',
        description: 'Gọi cấp cứu (115) hoặc đến cơ sở y tế ngay lập tức.',
        descriptionEn: 'Call emergency (115) or go to a medical facility immediately.',
      }
    ];
  }
}