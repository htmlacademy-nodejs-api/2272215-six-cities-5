
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

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({ offerId }).populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel.deleteMany({offerId}).exec();
    return result.deletedCount;
  }
}
