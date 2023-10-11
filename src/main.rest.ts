import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './shared/types/index.js';
import { ILogger, PinoLogger } from './shared/libs/index.js';
import { RestApplication } from './rest/index.js';

function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<ILogger>(Component.Logger).to(PinoLogger);

  const app = container.get<RestApplication>(Component.RestApplication);
  app.init();
}

bootstrap();
