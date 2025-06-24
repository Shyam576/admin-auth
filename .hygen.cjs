module.exports = {
  helpers: {
    ControllerName(name) {
      return `${this.ClassName(name)}Controller`;
    },
    ServiceName(name) {
      return `${this.ClassName(name)}Service`;
    },
    ModuleName(name) {
      return `${this.ClassName(name)}Module`;
    },
    DtoName(name) {
      return `${this.ClassName(name)}Dto`;
    },
    UpdateDtoName(name) {
      return `Update${this.DtoName(name)}`;
    },
    CreateDtoName(name) {
      return `Create${this.DtoName(name)}`;
    },
    EntityName(name) {
      return `${this.ClassName(name)}Entity`;
    },
    CreateCommandName(name) {
      return `Create${this.ClassName(name)}Command`;
    },
    CreateHandlerName(name) {
      return `Create${this.ClassName(name)}Handler`;
    },
    GetHandlerName(name) {
      return `Get${this.ClassName(name)}Handler`;
    },
    PageOptionsDtoName(name) {
      return this.ClassName(name) + 'PageOptionsDto';
    },
    NotFoundExceptionName(name) {
      return this.ClassName(name) + 'NotFoundException';
    },
    entityFileName(name) {
      return `${this.fileName(name)}.entity`;
    },
    createCommandFileName(name) {
      return `create-${this.fileName(name)}.command`;
    },
    getQueryFileName(name) {
      return `get-${this.fileName(name)}.query`;
    },
    controllerFileName(name) {
      return `${this.fileName(name)}.controller`;
    },
    dtoFileName(name) {
      return `${this.fileName(name)}.dto`;
    },
    notFoundExceptionFileName(name) {
      return `${this.fileName(name)}-not-found.exception`;
    },
    createDtoFileName(name) {
      return `create-${this.fileName(name)}.dto`;
    },
    updateDtoFileName(name) {
      return `update-${this.fileName(name)}.dto`;
    },
    pageOptionsDtoFileName(name) {
      return `${this.fileName(name)}-page-options.dto`;
    },
    serviceFileName(name) {
      return `${this.fileName(name)}.service`;
    },
    moduleFileName(name) {
      return `${this.fileName(name)}.module`;
    },
    ClassName(name) {
      return this.changeCase.pascal(name);
    },
    TableName(name) {
      const pulralized = this.inflection.pluralize(
        this.inflection.dasherize(name),
      );
      return pulralized.replace(/-/g, '_');
    },
    RepositoryName(name) {
      return `${this.ClassName(name)}Repository`;
    },
    moduleName(name) {
      return this.changeCase.camel(name);
    },
    fileName(name) {
      return this.inflection.dasherize(name).toLowerCase();
    },
  },
};
