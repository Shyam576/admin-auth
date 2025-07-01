import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import type { GuidelineEntity } from '../guidelines.entity.ts';


export class GuidelinesDto extends AbstractDto {
  @ApiProperty({ nullable: true })
  title!: string;

  @ApiProperty({nullable: true})
  description!: string;

  @ApiProperty({nullable: true})
  link!: string;


  constructor(user: GuidelineEntity) {
    super(user);
    this.title = user.title;
    this.description = user.description;
    this.link = user.link;
  }
}
