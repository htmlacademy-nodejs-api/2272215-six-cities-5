import { Types } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto } from './user-dto.js';
import { UserEntity } from './user-entity.js';

export interface IUserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findById(_id: Types.ObjectId): Promise<DocumentType<UserEntity> | null>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
}
