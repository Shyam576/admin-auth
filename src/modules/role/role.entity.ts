import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity.ts';
import { UseDto } from '../../decorators/use-dto.decorator.ts';
import { RoleDto } from './dto/role.dto.ts';
import { UserEntity } from '../../modules/user/user.entity.ts';
@Entity({ name: 'roles' })
@UseDto(RoleDto)
export class RoleEntity extends AbstractEntity<RoleDto> {
  @Column({ nullable: false, type: 'varchar' })
  name!: string;

  @Column({ nullable: false, type: 'varchar' })
  description!: string;

  @Column({ nullable: false, type: 'json', name: 'allowed_menus' })
  allowedMenus!: string[];

  @OneToMany(() => UserEntity, (user) => user.role)
  user!: UserEntity[];
}
