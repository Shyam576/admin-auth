import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleController } from './role.controller.ts';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [],
  controllers: [RoleController],
})
export class RoleModule {}
