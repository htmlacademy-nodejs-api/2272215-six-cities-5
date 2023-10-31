import { Types } from 'mongoose';
import { prop, defaultClasses, Ref } from '@typegoose/typegoose';
import { OfferType } from '../../types/index.js';
import { CategoryEntity } from '../category/index.js';
import { UserEntity } from '../user/index.js';

export class OfferEntity extends defaultClasses.TimeStamps {
  public _id: Types.ObjectId;

  public id: string;

  @prop({ required: true, trim: true })
  public title: string;

  @prop({ trim: true })
  public description: string;

  @prop()
  public postDate: Date;

  @prop()
  public image: string;

  @prop()
  public price: number;

  @prop({
    type: () => String,
    enum: OfferType
  })
  public type: OfferType;

  @prop({
    required: true,
    ref: CategoryEntity,
    default: [],
    _id: false,
  })
  public categories: Ref<CategoryEntity>[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public userId: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentCount: number;
}

