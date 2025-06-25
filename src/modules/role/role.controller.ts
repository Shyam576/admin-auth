import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RoleService } from './role.service.ts';
import { RoleDto } from './dto/role.dto.ts';
import { CreateRoleDto } from './dto/create-role.dto.ts';
import { Auth } from '../../decorators/http.decorators.ts';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Auth()
  async getAllRoles(): Promise<RoleDto[]> {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  @Auth()
  async getRole(@Param('id') id: string): Promise<RoleDto> {
    return this.roleService.getRoleById(id);
  }

  @Post()
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: RoleDto, description: 'Successfully Created Role' })
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    return this.roleService.createRole(createRoleDto);
  }

  @Put(':id')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: RoleDto, description: 'Successfully Created Role' })
  async updateRole(
    @Param('id') id: string,
    @Body() dto: CreateRoleDto,
  ): Promise<RoleDto> {
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
