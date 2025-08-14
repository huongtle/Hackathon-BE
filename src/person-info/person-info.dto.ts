import { IsNotEmpty, IsNumber, IsString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonInfoDto {
  @ApiProperty({ example: 25 })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({ example: 'male', enum: ['male', 'female', 'other'] })
  @IsNotEmpty()
  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @ApiProperty({ example: 'EN', enum: ['EN', 'VI'], required: false })
  @IsOptional()
  @IsString()
  @IsIn(['EN', 'VI'])
  locale?: string;
}