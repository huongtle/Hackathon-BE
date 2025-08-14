import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonInfoController } from './person-info.controller';
import { PersonInfoService } from './person-info.service';
import { PersonInfo, PersonInfoSchema } from './person-info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PersonInfo.name, schema: PersonInfoSchema }]),
  ],
  controllers: [PersonInfoController],
  providers: [PersonInfoService],
})
export class PersonInfoModule {}