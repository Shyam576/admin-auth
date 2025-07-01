import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuidelineService } from './guidelines.service.ts';
import { GuidelineController } from './guidelines.controller.ts';
import { GuidelineEntity } from './guidelines.entity.ts';


@Module({
  imports: [TypeOrmModule.forFeature([GuidelineEntity])],
  providers: [GuidelineService],
  controllers: [GuidelineController],
  exports: [GuidelineService],
})
export class GuideModule {}
