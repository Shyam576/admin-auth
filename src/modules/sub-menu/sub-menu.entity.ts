
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity.ts';
import { UseDto } from '../../decorators/use-dto.decorator.ts';
import { SubMenuDto} from './dtos/sub-menu.dto.ts'

@Entity({ name: 'sub_menus' })
@UseDto(SubMenuDto)
export class SubMenuEntity extends AbstractEntity<SubMenuDto> {

  @Column({ nullable: false })
  name!: string;
}