import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import { RoleEntity } from '../role.entity.ts';
import type { UserEntity } from 'modules/user/user.entity.ts';

export class RoleDto extends AbstractDto {
  @ApiProperty({ nullable: true })
  name!: string;

  @ApiProperty({nullable: true})
  description!: string;

  @ApiProperty({nullable: true})
  allowedMenus!: string[] 

  @ApiProperty({nullable: true})
  user!: UserEntity[];

  constructor(user: RoleEntity) {
    super(user);
    this.name = user.name;
    this.description = user.description;
    this.allowedMenus = user.allowedMenus;
    this.user = user.user;
  }
}
