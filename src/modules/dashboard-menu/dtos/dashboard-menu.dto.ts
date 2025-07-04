import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { DashboardMenuEntity } from '../dashboard-menu.entity';

export class DashboardMenuDto extends AbstractDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  url!: string;

  @ApiProperty()
  icon!: string;

  @ApiProperty({ nullable: true })
  subMenus!: string[];

  constructor(dashboardMenu: DashboardMenuEntity) {
    super(dashboardMenu);
    this.name = dashboardMenu.name;
    this.url = dashboardMenu.url;
    this.icon = dashboardMenu.icon;
    this.subMenus = dashboardMenu.subMenus;
  }
}
