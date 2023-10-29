import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../../types/index.js';
import { userModel, UserEntity } from '../user-entity.js';

export function createUserContainers() {
  const container = new Container();
  container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(userModel);
  return container;
}
