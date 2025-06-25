import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardMenuEntity } from './dashboard-menu.entity';
import { DashboardMenuService } from './dashboard-menu.service';
import { DashboardMenuController } from './dashboard-menu.controller';


@Module({
  imports: [TypeOrmModule.forFeature([DashboardMenuEntity])],
  controllers: [DashboardMenuController],
  providers: [DashboardMenuService],
  exports: [],
})
export class DashboardMenuModule {}
