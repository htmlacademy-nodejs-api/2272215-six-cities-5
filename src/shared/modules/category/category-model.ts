import { getModelForClass } from '@typegoose/typegoose';
import { CategoryEntity } from './category-entity.js';

export const categoryModel = getModelForClass(CategoryEntity);
