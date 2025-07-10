import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../decorators/http.decorators';
import { CreateSubMenuDto } from './dtos/create-sub-menu.dto.ts';
import type { SubMenuDto } from './dtos/sub-menu.dto.ts';
import { PageOptionsSubMenuDto } from './dtos/page-options-sub-menu.dto.ts';
import { UpdateSubMenuDto } from './dtos/update-sub-menu.dto.ts';
import { SubMenuService } from './sub-menu.service.ts';

@Controller('sub-menus')
@ApiTags('sub-menus')
export class SubMenuController {
  constructor(private subMenuService: SubMenuService) {}

  @Post()
  @Auth()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSubMenuDto: CreateSubMenuDto) {
    const entity = await this.subMenuService.create(createSubMenuDto);
    return entity.toDto();
  }

  @Get()
  @Auth()
  @HttpCode(HttpStatus.OK)
  getAll(@Query() pageOptionsSubMenuDto: PageOptionsSubMenuDto) {
    return this.subMenuService.getAll(pageOptionsSubMenuDto);
  }

  @Get(':id')
  @Auth()
  @HttpCode(HttpStatus.OK)
  async getSingle(@Param('id') id: string): Promise<SubMenuDto> {
    const entity = await this.subMenuService.getSingle(id as Uuid);
    return entity.toDto();
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id') id: string,
    @Body() updateSubMenuDto: UpdateSubMenuDto,
  ): Promise<void> {
    return this.subMenuService.update(id as Uuid, updateSubMenuDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async delete(@Param('id') id: string): Promise<void> {
    await this.subMenuService.delete(id as Uuid);
  }
}
