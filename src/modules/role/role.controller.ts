import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RoleService } from './role.service.ts';
import { RoleDto } from './dto/role.dto.ts';
import type { CreateRoleDto } from './dto/create-role.dto.ts';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAllRoles(): Promise<RoleDto[]> {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  async getRole(@Param('id') id: string): Promise<RoleDto> {
    return this.roleService.getRoleById(id);
  }

  @Post()
  async createRole(@Body() dto: CreateRoleDto): Promise<RoleDto> {
    return this.roleService.createRole(dto);
  }

  @Put(':id')
  async updateRole(@Param('id') id: string, @Body() dto: CreateRoleDto): Promise<RoleDto> {
    return this.roleService.updateRole(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRole(@Param('id') id: string): Promise<void> {
    return this.roleService.deleteRole(id);
  }

  @Get(':id/allowed-menus')
  async getAllowedMenus(@Param('id') id: string): Promise<string[]> {
    return this.roleService.getAllowedMenus(id);
  }
}
