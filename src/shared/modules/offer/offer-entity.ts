import { Types } from 'mongoose';
import { prop, defaultClasses, Ref, modelOptions } from '@typegoose/typegoose';
import { HousingType, AmenityType, City } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  public _id: Types.ObjectId;

  public id: string;

  @prop({ required: true, trim: true })
  public title: string;

  @prop({ trim: true })
  public description: string;

  @prop()
  public postDate: Date;

  @prop({
    required: true,
    type: () => String,
    enum: City,
  })
  public city: City;

  @prop()
  public previewImage: string;

  @prop()
  public price: number;

  @prop({
    required: true,
    type: () => String,
    enum: HousingType,
  })
  public housingType: HousingType;

  @prop({
    required: true,
    type: () => String,
    enum: AmenityType,
  })
  public amenities: AmenityType[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public userId: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentCount: number;
}
