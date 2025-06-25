import { ApiProperty } from "@nestjs/swagger";
import { AbstractDto } from "../../../common/dto/abstract.dto";
import type { DashboardMenuEntity } from "../dashboard-menu.entity";

export class DashboardMenuDto extends AbstractDto {
    @ApiProperty()
    name!: string;

    constructor(dashboardMenu: DashboardMenuEntity){
        super(dashboardMenu)
        this.name = dashboardMenu.name;
    }
}
