
import type { ICommandHandler } from '@nestjs/cqrs';
import {CommandHandler} from '@nestjs/cqrs';
import { CreateSubMenuDto } from '../dtos/create-sub-menu.dto.ts';
import { SubMenuEntity } from '../sub-menu.entity.ts';
import { SubMenuService } from '../sub-menu.service.ts';

export class CreateSubMenuCommand {
  constructor(public readonly dto: CreateSubMenuDto) {}
}

@CommandHandler(CreateSubMenuCommand)
export class CreateSubMenuHandler implements ICommandHandler<CreateSubMenuCommand> {
  constructor(private readonly service: SubMenuService) {}

  async execute(command: CreateSubMenuCommand): Promise<SubMenuEntity> {
    return this.service.create(command.dto);
  }
}