import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity.ts';
import { UseDto } from '../../decorators/use-dto.decorator.ts';
import { RoleDto } from './dto/role.dto.ts';
@Entity({ name: 'roles' })
@UseDto(RoleDto)
export class RoleEntity extends AbstractEntity<RoleDto> {
  @Column({ nullable: false, type: 'varchar' })
  name!: string;

  @Column({nullable:false, type: 'json'})
  allowedMenus!: string[];
}

