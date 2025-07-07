
import { NotFoundException } from '@nestjs/common';

export class SubMenuNotFoundException extends NotFoundException {
  constructor() {
    super('SubMenu not found');
  }
}