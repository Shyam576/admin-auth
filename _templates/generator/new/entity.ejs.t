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
%>
---
to: "src/modules/<%= fileName(name) %>/<%= entityFileName(name) %>.ts"
unless_exists: true
---
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: '<%= TableName(name) %>' })
export class <%= EntityName(name) %> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;
} 