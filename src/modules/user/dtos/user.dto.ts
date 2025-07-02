import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import { RoleDto } from '../../role/dto/role.dto.ts';
import {
  BooleanFieldOptional,
  EmailFieldOptional,
  PhoneFieldOptional,
  StringFieldOptional,
} from '../../../decorators/field.decorators.ts';
import type { UserEntity } from '../user.entity.ts';
import { ApiProperty } from '@nestjs/swagger';

// TODO, remove this class and use constructor's second argument's type
export type UserDtoOptions = Partial<{ isActive: boolean }>;

export class UserDto extends AbstractDto {
  @StringFieldOptional({ nullable: true })
  name!: string;

  @StringFieldOptional({ nullable: true })
  roleId?: string | null;

  @ApiProperty()
  role?: RoleDto | null;

  @EmailFieldOptional({ nullable: true })
  email?: string | null;

  @StringFieldOptional({ nullable: true })
  avatar?: string | null;

  @PhoneFieldOptional({ nullable: true })
  phone?: string | null;

  @BooleanFieldOptional()
  isActive?: boolean;

  constructor(user: UserEntity) {
    super(user);
    this.name = user.name;
    this.roleId = user.roleId;
    this.role = user.role ? new RoleDto(user.role) : null;
    this.email = user.email;
    this.avatar = user.avatar;
    this.phone = user.phone;
    this.isActive = user.isActive;
  }
}
