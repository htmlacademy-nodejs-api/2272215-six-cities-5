import 'reflect-metadata';
import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from './shared/types/index.js';
import { ILogger, IConfig, IDatabaseClient, PinoLogger, RestConfig, RestSchema, MongoDatabaseClient } from './shared/libs/index.js';
import { UserEntity, userModel } from './shared/modules/index.js';
import { RestApplication } from './rest/index.js';

function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<IConfig<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<IDatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(userModel);

  const app = container.get<RestApplication>(Component.RestApplication);
  app.init();
}

bootstrap();
