import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Auth } from '../../decorators/http.decorators.ts';
import { ApiOkResponse } from '@nestjs/swagger';
import { GuidelinesDto } from './dto/guidelines.dto.ts';
import { CreateGuidelinesDto } from './dto/create-guidelines.dto.ts';
import { GuidelineService } from './guidelines.service.ts';

@Controller('guidelines')
export class GuidelineController {
  constructor(private readonly guidelineService: GuidelineService) {}

  @Get()
  @Auth()
  async getAllGuidelines(): Promise<GuidelinesDto[]> {
    return this.guidelineService.getAllGuidelines();
  }

  @Get(':id')
  @Auth()
  async getGuideline(@Param('id') id: string): Promise<GuidelinesDto> {
    return this.guidelineService.getGuidelineById(id);
  }

  @Post()
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: GuidelinesDto, description: 'Successfully Created Guideline' })
  async createGuideline(@Body() createGuidelinesDto: CreateGuidelinesDto): Promise<GuidelinesDto> {
    return this.guidelineService.createGuideline(createGuidelinesDto);
  }

  @Put(':id')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: GuidelinesDto, description: 'Successfully Created Guideline' })
  async updateGuideline(
    @Param('id') id: string,
    @Body() dto: CreateGuidelinesDto,
  ): Promise<GuidelinesDto> {
    return this.guidelineService.updateGuideline(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteGuideline(@Param('id') id: string): Promise<void> {
    return this.guidelineService.deleteGuideline(id);
  }

}
