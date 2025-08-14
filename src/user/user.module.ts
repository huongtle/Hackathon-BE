import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserInformation, UserInformationSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserInformation.name, schema: UserInformationSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}