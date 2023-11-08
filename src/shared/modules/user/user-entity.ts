import type { Types } from 'mongoose';
import { getModelForClass, defaultClasses, modelOptions, prop } from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import { createSHA256 } from '../../utils/index.js';

@modelOptions({
  schemaOptions: {
    collection: 'users',
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  public _id: Types.ObjectId;

  public id: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatarPath: string;

  @prop({ required: true, default: '' })
  public firstName: string;

  @prop({ required: true, default: '' })
  public lastName: string;

  @prop({ require: true, default: '' })
  private passwordHash?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
  }

  public setPasswordHash(password: string, salt: string) {
    this.passwordHash = createSHA256(password, salt);
  }

  public getPasswordHash(): string | undefined {
    return this.passwordHash;
  }
}

export const userModel = getModelForClass(UserEntity);
