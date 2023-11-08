import type { Types } from 'mongoose';
import { defaultClasses, prop, modelOptions } from '@typegoose/typegoose';
import { Category } from '../../types/index.js';

@modelOptions({
  schemaOptions: {
    collection: 'categories',
  }
})
export class CategoryEntity extends defaultClasses.TimeStamps implements Category {
  public _id: Types.ObjectId;

  public id: string;

  @prop({ required: true, trim: true })
  public name: string;
}
