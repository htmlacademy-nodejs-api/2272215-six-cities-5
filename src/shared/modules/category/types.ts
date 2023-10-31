import { DocumentType } from '@typegoose/typegoose';
import { CategoryEntity } from './category-entity.js';
import { CreateCategoryDto } from './category-dto.js';

export interface ICategoryService {
  create(dto: CreateCategoryDto): Promise<DocumentType<CategoryEntity>>;
  findById(id: string): Promise<DocumentType<CategoryEntity> | null>;
  findByName(name: string): Promise<DocumentType<CategoryEntity> | null>;
}
