import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../../types/index.js';
import { CategoryEntity} from '../category-entity.js';
import { categoryModel } from '../category-model.js';

export function createCategoryContainers () {
  const container = new Container();
  container.bind<types.ModelType<CategoryEntity>>(Component.CategoryModel).toConstantValue(categoryModel);
  return container;
}
