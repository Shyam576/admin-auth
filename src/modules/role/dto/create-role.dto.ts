import { StringField } from '../../../decorators/field.decorators.ts';
import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @StringField()
  name!: string;

  @StringField()
  description!:string;

  @ApiProperty({ type: [String], description: 'Array of allowed menu keys' })
  @IsArray()
  @IsString({ each: true })
  allowedMenus!: string[];
}
