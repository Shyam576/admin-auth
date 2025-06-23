import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import { RoleEntity } from '../role.entity.ts';

export class RoleDto extends AbstractDto {
  @ApiProperty({ nullable: true })
  name!: string;

  @ApiProperty({nullable: true})
  allowedMenus!: string[]

  constructor(user: RoleEntity) {
    super(user);
    this.name = user.name;
    this.allowedMenus = user.allowedMenus;
  }
}
