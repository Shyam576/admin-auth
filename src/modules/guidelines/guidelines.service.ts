import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuidelinesDto } from './dto/guidelines.dto.ts';
import type { CreateGuidelinesDto } from './dto/create-guidelines.dto.ts';
import { GuidelineEntity } from './guidelines.entity.ts';


@Injectable()
export class GuidelineService {
  constructor(
    @InjectRepository(GuidelineEntity)
    private readonly GuidelineRepository: Repository<GuidelineEntity>,
  ) {}

  async getAllGuidelines(): Promise<GuidelinesDto[]> {
    const Guidelines = await this.GuidelineRepository.find({
        relations: ['user']
    });
    return Guidelines.map((Guideline) => new GuidelinesDto(Guideline));
  }

  async getGuidelineById(id: string): Promise<GuidelinesDto> {
    const Guideline = await this.GuidelineRepository.findOneBy({ id: id as Uuid });
    if (!Guideline) throw new NotFoundException('Guideline not found');
    return new GuidelinesDto(Guideline);
  }

  async createGuideline(createGuidelinesDto: CreateGuidelinesDto): Promise<GuidelinesDto> {
    const GuidelinesDto = {
        ...createGuidelinesDto,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    const Guideline = this.GuidelineRepository.create(GuidelinesDto);
    return await this.GuidelineRepository.save(Guideline);
    
  }

  async updateGuideline(id: string, dto: CreateGuidelinesDto): Promise<GuidelinesDto> {
    const Guideline = await this.GuidelineRepository.findOneBy({ id: id as Uuid });
    if (!Guideline) throw new NotFoundException('Guideline not found');

    const updatedDto = {
        ...dto,
        updatedAt: new Date()
    }
    Object.assign(Guideline, updatedDto);
    await this.GuidelineRepository.save(Guideline);
    return new GuidelinesDto(Guideline);
  }

  async deleteGuideline(id: string): Promise<void> {
    await this.GuidelineRepository.delete(id as Uuid);
  }

}
