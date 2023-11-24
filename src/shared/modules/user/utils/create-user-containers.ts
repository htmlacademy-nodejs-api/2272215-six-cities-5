import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { IController } from '../../../libs/rest/index.js';
import { Component } from '../../../types/index.js';
import { userModel, UserEntity } from '../user-entity.js';
import { UserController } from '../user-controller.js';
import { IUserService } from '../types.js';
import { UserService } from '../user-service.js';

export function createUserContainers() {
  const container = new Container();
  container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(userModel);
  container.bind<IController>(Component.UserController).to(UserController);
  container.bind<IUserService>(Component.UserService).to(UserService);
  return container;
}
