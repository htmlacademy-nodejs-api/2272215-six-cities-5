import { Types } from 'mongoose';
import { prop, defaultClasses, Ref, modelOptions } from '@typegoose/typegoose';
import { HousingType, AmenityType } from '../../types/index.js';
import { GeoLocation } from '../geo-location/index.js';
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

  @prop({ required: true, trim: true })
  public description: string;

  @prop({ required: true })
  public postDate: Date;

  @prop({
    required: true,
    _id: false,
    type: () => GeoLocation
  })
  public geoLocation: GeoLocation;

  @prop({ required: true })
  public previewImage: string;

  @prop({
    required: true,
    type: () => String,
  })
  public housingPhotos: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public rating: number;

  @prop({
    required: true,
    type: () => String,
    enum: HousingType,
  })
  public housingType: HousingType;

  @prop({ required: true })
  public roomCount: number;

  @prop({ required: true })
  public guestCount: number;

  @prop()
  public price: number;

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
