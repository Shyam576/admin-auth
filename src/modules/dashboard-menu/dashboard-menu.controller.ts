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
import { CreateDashbaordMenuDto } from './dtos/create-dashboard-menu.dto';
import { ApiBody, ApiOkResponse, ApiParam } from '@nestjs/swagger';

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
  @ApiBody({ type: CreateDashbaordMenuDto })
  @ApiOkResponse({
    type: DashboardMenuDto,
    description: 'Successfully Created Menu',
  })
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
  @ApiOkResponse({
    type: DashboardMenuDto,
    description: 'Successfully Created Menu',
  })
  async updateDashboardMenu(
    @Param('id') id: string,
    @Body() createDashboardMenuDto: CreateDashbaordMenuDto,
  ): Promise<DashboardMenuDto> {
    return await this.dashboardMenuService.updateDashboardMenu(
      id as Uuid,
      createDashboardMenuDto,
    );
  }

  @Delete(':id')
  @Auth()
  async deleteDashboardMenu(@Param('id') id: string) {
    return await this.dashboardMenuService.deleteDashboardMenu(id as Uuid);
  }
}
