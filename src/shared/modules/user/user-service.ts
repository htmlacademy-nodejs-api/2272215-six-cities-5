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

  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    const foundUser = await this.userModel.findById(id);
    return foundUser;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    const foundUser = await this.userModel.findOne({ email });
    return foundUser;
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const foundUser = await this.findByEmail(dto.email);

    if(foundUser) {
      return foundUser;
    }

    const newUser = await this.create(dto, salt);
    return newUser;
  }
}
