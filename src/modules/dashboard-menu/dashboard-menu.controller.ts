import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DashboardMenuService } from './dashboard-menu.service';
import { Auth } from '../../decorators/http.decorators';
import { DashboardMenuDto } from './dtos/dashboard-menu.dto';
import type { CreateDashbaordMenuDto } from './dtos/create-dashboard-menu.dto';
import { ApiOkResponse } from '@nestjs/swagger';


@Controller('dashboard-menu-controller')
export class DashboardMenuController {
  constructor(private dashboardMenuService: DashboardMenuService) {}

  @Get()
  @Auth()
  @HttpCode(HttpStatus.OK)
  async getAllDashboardMenus(): Promise<DashboardMenuDto[]> {
    return await this.dashboardMenuService.getAll();
  }

  @Post()
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: DashboardMenuDto, description: 'Successfully Created Menu' })
  async createDashboardMenu(
    @Body() createDashboardMenuDto: CreateDashbaordMenuDto,
  ): Promise<DashboardMenuDto> {
    return this.dashboardMenuService.createDashboardMenu(
      createDashboardMenuDto,
    );
  }

  @Patch(':id')
  @Auth()
  @HttpCode(HttpStatus.OK)
  async updateDashboardMenu(
    @Param('id') id: Uuid,
    @Body() createDashboardMenuDto: CreateDashbaordMenuDto,
  ): Promise<DashboardMenuDto> {
    return await this.dashboardMenuService.updateDashboardMenu(
      id,
      createDashboardMenuDto,
    );
  }

  @Delete(':id')
  @Auth()
  async deleteDashboardMenu(
    @Param('id') id: Uuid,
  ){
    return await this.dashboardMenuService.deleteDashboardMenu(id);
  }

}
