import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateDashbaordMenuDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  url!: string;

  @ApiProperty()
  @IsString()
  icon!: string;

  @ApiProperty({ type: [String], description: 'Array of sub menu under menu' })
  @IsArray()
  @IsString({ each: true })
  subMenus!: string[];
}
