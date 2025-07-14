
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SubMenuEntity } from './sub-menu.entity.ts';
import type { CreateSubMenuDto } from './dtos/create-sub-menu.dto.ts';
import type { UpdateSubMenuDto } from './dtos/update-sub-menu.dto.ts';
import { PageOptionsSubMenuDto } from './dtos/page-options-sub-menu.dto.ts';


@Injectable()
export class SubMenuService {
  constructor(
    @InjectRepository(SubMenuEntity)
    private readonly repo: Repository<SubMenuEntity>,
  ) {}

  async create(createDto: CreateSubMenuDto): Promise<SubMenuEntity> {
    const entity = this.repo.create(createDto);
    return this.repo.save(entity);
  }

  async getAll(pageOptionsSubMenuDto:PageOptionsSubMenuDto){
    return this.repo.find({where:{
      id: pageOptionsSubMenuDto?.q as Uuid
    }});
  }

  async getSingle(id: string): Promise<SubMenuEntity> {
    const entity = await this.repo.findOneBy({ id: id as Uuid });
    if (!entity) throw new NotFoundException();
    return entity;
  }

  async update(id: string, updateDto: UpdateSubMenuDto): Promise<void> {
    await this.repo.update(id, updateDto);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}