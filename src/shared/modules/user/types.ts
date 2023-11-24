import { Request } from 'express';
import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto, LoginUserDto } from './user-dto.js';
import { UserEntity } from './user-entity.js';

export interface IUserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findById(id: string): Promise<DocumentType<UserEntity> | null>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
}

export type CreateUserRequest = Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>;

export type LoginUserRequest = Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>;
