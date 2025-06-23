import {
  EmailField,
  PasswordField,
  PhoneFieldOptional,
  StringField,
} from '../../../decorators/field.decorators.ts';

export class UserRegisterDto {
  @StringField()
  readonly name!:string;

  @EmailField()
  readonly email!: string;

  @PasswordField({ minLength: 6 })
  readonly password!: string;

  @PhoneFieldOptional()
  phone?: string;
}
