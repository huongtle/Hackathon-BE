import { IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested, IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class UserInfoDto {
  @ApiProperty({ example: 25 })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({ example: 'male', enum: ['male', 'female', 'other'] })
  @IsNotEmpty()
  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;
}

class ChatMessageDto {
  @ApiProperty({ example: 'user', enum: ['user', 'bot'] })
  @IsNotEmpty()
  @IsString()
  @IsIn(['user', 'bot'])
  user: string;

  @ApiProperty({ example: 'I have a fever and headache' })
  @IsNotEmpty()
  @IsString()
  message: string;
}

export class AnalyzeSymptomsDto {
  @ApiProperty({ example: 'EN', enum: ['EN', 'VI'], required: false })
  @IsOptional()
  @IsString()
  @IsIn(['EN', 'VI'])
  locale?: string;

  @ApiProperty({ type: UserInfoDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserInfoDto)
  userInfo: UserInfoDto;

  @ApiProperty({ type: [ChatMessageDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  chat: ChatMessageDto[];
}