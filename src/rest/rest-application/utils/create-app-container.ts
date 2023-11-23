import { Container } from 'inversify';
import { IConfig, IDatabaseClient, ILogger, MongoDatabaseClient, PinoLogger, RestConfig, RestSchema } from '../../../shared/libs/index.js';
import { Component } from '../../../shared/types/index.js';
import { AppExceptionFilter, IExceptionFilter } from '../../../shared/libs/rest/index.js';
import { RestApplication } from '../rest.application.js';

export function createApplicationContainer() {
  const appContainer = new Container();
  appContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  appContainer.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  appContainer.bind<IConfig<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  appContainer.bind<IDatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  appContainer.bind<IExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  return appContainer;
}
