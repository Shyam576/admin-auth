import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DashboardMenuEntity } from './dashboard-menu.entity';
import type { Repository } from 'typeorm';
import { DashboardMenuDto } from './dtos/dashboard-menu.dto';
import { CreateDashbaordMenuDto } from './dtos/create-dashboard-menu.dto';

@Injectable()
export class DashboardMenuService {
  constructor(
    @InjectRepository(DashboardMenuEntity)
    private dashboardMenuRepository: Repository<DashboardMenuEntity>,
  ) {}

  async getAll(): Promise<DashboardMenuDto[]> {
    const menus = await this.dashboardMenuRepository.find();
    return menus.map((menu) => new DashboardMenuDto(menu));
  }

  async createDashboardMenu(
    createDashboardMenu: CreateDashbaordMenuDto,
  ): Promise<DashboardMenuDto> {
    const dashboardMenuDto = {
      ...createDashboardMenu,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const menu = this.dashboardMenuRepository.create(dashboardMenuDto);
    return await this.dashboardMenuRepository.save(menu);
  }

  async updateDashboardMenu(
    id: Uuid,
    updateDashboardMenuDto: CreateDashbaordMenuDto,
  ): Promise<DashboardMenuDto> {
    const menu = await this.dashboardMenuRepository.findOne({
      where: { id: id },
    });

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }
    const updatedDashboardMenuDto = {
      ...updateDashboardMenuDto,
      updatedAt: new Date(),
    };
    Object.assign(menu, updatedDashboardMenuDto);

    const updated = await this.dashboardMenuRepository.save(menu);

    return updated;
  }

  async deleteDashboardMenu(id: Uuid){
    const deleted =  await this.dashboardMenuRepository.delete(id);
    if(deleted.affected ===1){
        return { sucess: true, message: 'Menu deleted successfully'}
    }else{
        throw new InternalServerErrorException('Could not delete the menu')
    }
  }
}
