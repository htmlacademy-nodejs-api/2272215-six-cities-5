import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { ILogger } from '../../libs/index.js';
import { Component } from '../../types/index.js';

import { CategoryEntity } from './category-entity.js';
import { CreateCategoryDto } from './category-dto.js';
import { ICategoryService } from './types.js';

@injectable()
export class CategoryService implements ICategoryService{
  constructor(
    @inject(Component.CategoryModel) private readonly categoryModel: types.ModelType<CategoryEntity>,
    @inject(Component.Logger) private readonly logger: ILogger,
  ) {}

  public async create(dto: CreateCategoryDto): Promise<DocumentType<CategoryEntity>> {
    const newCategory = await this.categoryModel.create(dto);
    this.logger.info(`New category created ${dto.name}`);
    return newCategory;
  }

  public async findById(id: string): Promise<DocumentType<CategoryEntity> | null> {
    return this.categoryModel.findById(id).exec();
  }

  public async findByName(name: string): Promise<DocumentType<CategoryEntity> | null> {
    return this.categoryModel.findOne({ name }).exec();
  }

  public async findByNameOrCreate(name: string, dto: CreateCategoryDto): Promise<DocumentType<CategoryEntity>> {
    const foundCategory = await this.findByName(name);
    if(foundCategory) {
      return foundCategory;
    }

    return await this.create(dto);
  }
}
