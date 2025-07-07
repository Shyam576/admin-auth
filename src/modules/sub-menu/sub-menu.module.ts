
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateSubMenuHandler } from './commands/create-sub-menu.command.ts';
import { SubMenuController } from './sub-menu.controller.ts';
import { SubMenuEntity } from './sub-menu.entity.ts';
import { SubMenuService } from './sub-menu.service.ts';


@Module({
  imports: [
    TypeOrmModule.forFeature([SubMenuEntity]),
  ],
  providers: [SubMenuService, CreateSubMenuHandler],
  controllers: [SubMenuController],
})
export class SubMenuModule {}