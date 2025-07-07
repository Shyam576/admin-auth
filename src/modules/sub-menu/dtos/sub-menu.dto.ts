
import { AbstractDto } from "../../../common/dto/abstract.dto.ts";
import { SubMenuEntity } from '../sub-menu.entity.ts';


export class SubMenuDto extends AbstractDto {
  name!: string;
}