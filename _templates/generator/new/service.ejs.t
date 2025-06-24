<%
function changeCasePascal(str) {
  return str.replace(/(^|_|\-)(\w)/g, (_, __, c) => c ? c.toUpperCase() : '');
}
function inflectionDasherize(str) {
  return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase()).replace(/^-/, '');
}
function fileName(name) {
  return inflectionDasherize(name).toLowerCase();
}
function moduleFileName(name) {
  return fileName(name) + '.module';
}
function ClassName(name) {
  return changeCasePascal(name);
}
function ModuleName(name) {
  return ClassName(name) + 'Module';
}
function ControllerName(name) {
  return ClassName(name) + 'Controller';
}
function controllerFileName(name) {
  return fileName(name) + '.controller';
}
function ServiceName(name) {
  return ClassName(name) + 'Service';
}
function serviceFileName(name) {
  return fileName(name) + '.service';
}
function EntityName(name) {
  return ClassName(name) + 'Entity';
}
function entityFileName(name) {
  return fileName(name) + '.entity';
}
function createCommandFileName(name) {
  return 'create-' + fileName(name) + '.command';
}
function CreateHandlerName(name) {
  return 'Create' + ClassName(name) + 'Handler';
}
function CreateDtoName(name) {
  return 'Create' + ClassName(name) + 'Dto';
}
function createDtoFileName(name) {
  return 'create-' + fileName(name) + '.dto';
}

function ClassName(name) {
  return changeCasePascal(name);
}

function dtoFileName(name) {
  return fileName(name) + '.dto';
}
function DtoName(name) {
  return ClassName(name) + 'Dto';
}
function updateDtoFileName(name) {
  return 'update-' + fileName(name) + '.dto';
}
function UpdateDtoName(name) {
  return 'Update' + ClassName(name) + 'Dto';
}
%>
---
to: "src/modules/<%= fileName(name) %>/<%= serviceFileName(name) %>.ts"
unless_exists: true
---
<%
classNameVar = ClassName(name);
ServiceName = ServiceName(name);
EntityName = EntityName(name);
createDtoName = createDtoFileName(name);
dtoName = dtoFileName(name);
updateDtoName = updateDtoFileName(name);
%>import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { <%= EntityName %> } from './<%= entityFileName(name) %>';
import { <%= CreateDtoName(name) %> } from './dtos/<%= createDtoName %>';
import { <%= UpdateDtoName(name) %> } from './dtos/<%= updateDtoName %>';

@Injectable()
export class <%= ServiceName %> {
  constructor(
    @InjectRepository(<%= EntityName %>)
    private readonly repo: Repository<<%= EntityName %>>,
  ) {}

  async create(createDto: <%= CreateDtoName(name) %>): Promise<<%= EntityName %>> {
    const entity = this.repo.create(createDto);
    return this.repo.save(entity);
  }

  async getAll(): Promise<<%= EntityName %>[]> {
    return this.repo.find();
  }

  async getSingle(id: string): Promise<<%= EntityName %>> {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) throw new NotFoundException();
    return entity;
  }

  async update(id: string, updateDto: <%= UpdateDtoName(name) %>): Promise<void> {
    await this.repo.update(id, updateDto);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
} 