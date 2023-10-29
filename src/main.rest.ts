import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './shared/types/index.js';
import { RestApplication, createApplicationContainer } from './rest/index.js';
import { createUserContainers } from './shared/modules/user/index.js';

function bootstrap() {
  const container = Container.merge(
    createApplicationContainer(),
    createUserContainers(),
  );

  const app = container.get<RestApplication>(Component.RestApplication);
  app.init();
}

bootstrap();
