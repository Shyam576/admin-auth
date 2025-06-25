import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DashboardMenuService } from './dashboard-menu.service';
import { Auth } from '../../decorators/http.decorators';
import type { DashboardMenuDto } from './dtos/dashboard-menu.dto';
import type { CreateDashbaordMenuDto } from './dtos/create-dashboard-menu.dto';

@Controller('Dashboard Menu Controller')
export class DashboardMenuController {
  constructor(private dashboardMenuService: DashboardMenuService) {}

  @Get()
  @Auth()
  async getAllDashboardMenus(): Promise<DashboardMenuDto[]> {
    return await this.dashboardMenuService.getAll();
  }

  @Post()
  @Auth()
  async createDashboardMenu(
    @Body() createDashboardMenuDto: CreateDashbaordMenuDto,
  ): Promise<DashboardMenuDto> {
    return this.dashboardMenuService.createDashboardMenu(
      createDashboardMenuDto,
    );
  }

  @Patch()
  @Auth()
  async updateDashboardMenu(
    @Param('id') id: Uuid,
    @Body() createDashboardMenuDto: CreateDashbaordMenuDto,
  ): Promise<DashboardMenuDto> {
    return await this.dashboardMenuService.updateDashboardMenu(
      id,
      createDashboardMenuDto,
    );
  }
}
