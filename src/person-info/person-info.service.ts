import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonInfo, PersonInfoDocument } from './person-info.schema';
import { CreatePersonInfoDto } from './person-info.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PersonInfoService {
  constructor(
    @InjectModel(PersonInfo.name) private personInfoModel: Model<PersonInfoDocument>,
  ) {}

  async create(createPersonInfoDto: CreatePersonInfoDto): Promise<PersonInfo> {
    const personInfo = new this.personInfoModel({
      ...createPersonInfoDto,
      locale: createPersonInfoDto.locale || 'EN',
      uuid: uuidv4(),
    });
    return personInfo.save();
  }
}