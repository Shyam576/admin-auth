import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity.ts';
import { RoleDto } from './dto/role.dto.ts';
import type { CreateRoleDto } from './dto/create-role.dto.ts';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async getAllRoles(): Promise<RoleDto[]> {
    const roles = await this.roleRepository.find();
    return roles.map((role) => new RoleDto(role));
  }

  async getRoleById(id: string): Promise<RoleDto> {
    const role = await this.roleRepository.findOneBy({ id: id as Uuid });
    if (!role) throw new NotFoundException('Role not found');
    return new RoleDto(role);
  }

  async createRole(dto: CreateRoleDto): Promise<RoleDto> {
    const role = this.roleRepository.create(dto);
    await this.roleRepository.save(role);
    return new RoleDto(role);
  }

  async updateRole(id: string, dto: CreateRoleDto): Promise<RoleDto> {
    const role = await this.roleRepository.findOneBy({ id: id as Uuid });
    if (!role) throw new NotFoundException('Role not found');
    Object.assign(role, dto);
    await this.roleRepository.save(role);
    return new RoleDto(role);
  }

  async deleteRole(id: string): Promise<void> {
    await this.roleRepository.delete(id as Uuid);
  }

  async getAllowedMenus(id: string): Promise<string[]> {
    const role = await this.roleRepository.findOneBy({ id: id as Uuid });
    if (!role) throw new NotFoundException('Role not found');
    return role.allowedMenus;
  }
} 