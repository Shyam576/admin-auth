---
to: "src/modules/<%= h.fileName(name) %>/commands/<%= h.createCommandFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('CreateCommand') %>
---
<%

 ClassName = h.ClassName(name);
 fieldName = h.changeCase.camel(ClassName);

 CreateCommandName = h.CreateCommandName(name);
 CreateHandlerName = h.CreateHandlerName(name);

 CreateDtoName = h.CreateDtoName(name);
 createDtoName = h.changeCase.camel(CreateDtoName);
 createDtoFileName = h.createDtoFileName(name);

 EntityName = h.EntityName(name);
 entityName = h.changeCase.camel(EntityName);

 EntityName = h.EntityName(name);
 entityName = h.changeCase.camel(EntityName);
 entityFileName = h.entityFileName(name);

 RepositoryName = h.RepositoryName(name);
  repositoryName = h.changeCase.camel(RepositoryName);

%>import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { <%= CreateDtoName %> } from '../dtos/<%= createDtoFileName %>';
import { <%= EntityName %> } from '../<%= entityFileName %>';

export class <%= CreateCommandName %> implements ICommand {
  constructor(
    public readonly <%=createDtoName %>: <%= CreateDtoName %>,
  ) {}
}

@CommandHandler(<%= CreateCommandName %>)
export class <%= CreateHandlerName %>
  implements ICommandHandler<<%= CreateCommandName %>, <%= EntityName %>>
{
  constructor(
    @InjectRepository(<%= EntityName %>)
    private <%= repositoryName %> : Repository<<%= EntityName %>>,
  ) {}

  async execute(command: <%= CreateCommandName %>) {
    const { <%=createDtoName %> } = command;
    const <%= entityName %> = this.<%= repositoryName %>.create(<%= createDtoName %>);

    await this.<%= repositoryName %>.save(<%= entityName %>);

    return <%= entityName %>;
  }
}
