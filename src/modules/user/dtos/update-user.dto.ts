import { BooleanFieldOptional, StringFieldOptional } from "../../../decorators/field.decorators";

export class UpdateUserDto{
    @StringFieldOptional()
    name!: string;

    @StringFieldOptional()
    roleId!:string;

    @StringFieldOptional()
    email!: string;

    @StringFieldOptional()
    phone!: string;

    @BooleanFieldOptional()
    isActive!: boolean;
}