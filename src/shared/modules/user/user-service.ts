import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/index.js';
import { IUserService } from './types.js';
import { CreateUserDto } from './user-dto.js';
import { UserEntity } from './user-entity.js';

@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
    @inject(Component.Logger) private readonly logger: ILogger,
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPasswordHash(dto.password, salt);

    const newUser = await this.userModel.create(user);
    this.logger.info(`New user created with email '${newUser.email}'`);
    return newUser;
  }
}
