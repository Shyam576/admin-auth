import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDashbaordMenuDto{
    @ApiProperty()
    @IsString()
    name!: string;
}