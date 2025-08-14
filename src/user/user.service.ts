import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInformation } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserInformation.name) private userModel: Model<UserInformation>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserInformation> {
    const sessionId = uuidv4();
    const user = new this.userModel({
      ...createUserDto,
      session_id: sessionId,
    });
    return user.save();
  }
}