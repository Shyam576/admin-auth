
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
function CreateCommandName(name) {
  return 'Create' + ClassName(name) + 'Command';
}
%>
---
to: "src/modules/<%= fileName(name) %>/commands/<%= createCommandFileName(name) %>.ts"
unless_exists: true
---

import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { <%= CreateDtoName(name) %> } from '../dtos/<%= createDtoFileName(name) %>';
import { <%= EntityName(name) %> } from '../<%= entityFileName(name) %>';
import { <%= ServiceName(name) %> } from '../<%= serviceFileName(name) %>';

export class <%= CreateCommandName(name) %> {
  constructor(public readonly dto: <%= CreateDtoName(name) %>) {}
}

@CommandHandler(<%= CreateCommandName(name) %>)
export class <%= CreateHandlerName(name) %> implements ICommandHandler<<%= CreateCommandName(name) %>> {
  constructor(private readonly service: <%= ServiceName(name) %>) {}

  async execute(command: <%= CreateCommandName(name) %>): Promise<<%= EntityName(name) %>> {
    return this.service.create(command.dto);
  }
} 