
import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateCommentDto } from './comment-dto.js';
import { CommentEntity } from './comment-entity.js';
import { ICommentService } from './types.js';

import { Component } from '../../types/index.js';

@injectable()
export class CommentService implements ICommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const newComment = await this.commentModel.create(dto);
    return newComment.populate('userId');
  }
}
