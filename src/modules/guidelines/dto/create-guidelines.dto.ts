import { StringField } from '../../../decorators/field.decorators.ts';

export class CreateGuidelinesDto {
  @StringField()
  title!: string;

  @StringField()
  description!:string;

  @StringField()
  link!:string;
}
