import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PersonInfoService } from './person-info.service';
import { CreatePersonInfoDto } from './person-info.dto';

@ApiTags('Person Info')
@Controller('person-info')
export class PersonInfoController {
  constructor(private readonly personInfoService: PersonInfoService) {}

  @Post()
  @ApiOperation({ summary: 'Save personal information' })
  @ApiResponse({ status: 201, description: 'Personal information saved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body(ValidationPipe) createPersonInfoDto: CreatePersonInfoDto) {
    return this.personInfoService.create(createPersonInfoDto);
  }
}