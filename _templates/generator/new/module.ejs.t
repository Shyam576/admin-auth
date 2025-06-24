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
function TableName(name) {
  return fileName(name) + 's';
}
function ControllerFileName(name) {
  return fileName(name) + '.controller';
}
function ServiceFileName(name) {
  return fileName(name) + '.service';
}
function createHandlerName(name) {
  return 'Create' + ClassName(name) + 'Handler';
}
%>
---
to: "src/modules/<%= fileName(name)%>/<%=moduleFileName(name)%>.ts"
unless_exists: true
---

<%
var handlers = [CreateHandlerName(name)];
%>import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {<%= CreateHandlerName(name) %>} from './commands/<%= createCommandFileName(name) %>';
import {<%= ControllerName(name) %>} from './<%= controllerFileName(name) %>';
import {<%= EntityName(name) %>} from './<%= entityFileName(name) %>';
import {<%= ServiceName(name) %>} from './<%= serviceFileName(name) %>';

@Module({
    imports:[
        TypeOrmModule.forFeature([<%= EntityName(name) %>]),
    ],
    providers: [<%= [ServiceName(name)].concat(handlers).join(', ') %>],
    controllers:[<%= ControllerName(name) %>],
})

export class <%= ModuleName(name) %> {} 