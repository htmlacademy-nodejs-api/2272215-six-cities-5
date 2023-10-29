import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto } from './user-dto.js';
import { UserEntity } from './user-entity.js';

export interface IUserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
}
