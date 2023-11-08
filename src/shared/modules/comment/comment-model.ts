import { getModelForClass } from '@typegoose/typegoose';
import { CommentEntity } from './comment-entity.js';

export const commentModel = getModelForClass(CommentEntity);
