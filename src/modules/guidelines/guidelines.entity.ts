import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity.ts';
import { UseDto } from '../../decorators/use-dto.decorator.ts';
import { GuidelinesDto } from './dto/guidelines.dto.ts';


@Entity({ name: 'guidelines' })
@UseDto(GuidelinesDto)
export class GuidelineEntity extends AbstractEntity<GuidelinesDto> {
  @Column({ nullable: false, type: 'varchar' })
  title!: string;

  @Column({ nullable: false, type: 'varchar' })
  description!: string;

  @Column({ nullable: false, type: 'varchar', name: 'link' })
  link!: string;

}
