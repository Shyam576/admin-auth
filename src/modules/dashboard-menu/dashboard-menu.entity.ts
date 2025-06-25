import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity.ts';
import { UseDto } from '../../decorators/use-dto.decorator.ts';
import { DashboardMenuDto } from './dtos/dashboard-menu.dto.ts';
@Entity({ name: 'dashboard_menus' })
@UseDto(DashboardMenuDto)
export class DashboardMenuEntity extends AbstractEntity<DashboardMenuDto> {
  @Column({ nullable: false, type: 'varchar' })
  name!: string;

  @Column({ nullable: false, type: 'varchar' })
  url!: string;

  @Column({ nullable: false, type: 'varchar' })
  icon!: string;
}

