import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsNotEmpty } from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export class CreateUserDto {
  @ApiProperty({ example: 25, description: 'User age' })
  @IsNotEmpty({ message: 'Age is required' })
  @IsNumber({}, { message: 'Age must be a number' })
  age: number;

  @ApiProperty({ example: 'male', description: 'User gender', enum: Gender })
  @IsNotEmpty({ message: 'Gender is required' })
  @IsEnum(Gender, { message: 'Gender must be male, female, or other' })
  gender: Gender;
}