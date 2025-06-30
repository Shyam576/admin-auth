import { StringField } from '../../../decorators/field.decorators.ts';

export class LogoutResponseDto {
  @StringField()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
} 