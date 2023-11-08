import { DocumentType } from '@typegoose/typegoose';
import { CreateCommentDto } from './comment-dto.js';
import { CommentEntity } from './comment-entity.js';

export interface ICommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
}
