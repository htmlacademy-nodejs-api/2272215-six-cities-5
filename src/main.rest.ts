import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './shared/types/index.js';
import { RestApplication, createApplicationContainer } from './rest/index.js';
import { createUserContainers, createOfferContainer } from './shared/modules/index.js';

function bootstrap() {
  const container = Container.merge(
    createApplicationContainer(),
    createUserContainers(),
    createOfferContainer(),
  );

  const app = container.get<RestApplication>(Component.RestApplication);
  app.init();
}

bootstrap();
