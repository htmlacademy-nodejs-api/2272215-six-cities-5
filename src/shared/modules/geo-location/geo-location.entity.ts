import { prop } from '@typegoose/typegoose';
import { Geo } from './geo.entity.js';
import { IGeoLocation } from '../../types/index.js';

export class GeoLocation implements IGeoLocation {
  @prop({ required: true })
  public city: string;

  @prop({
    required: true,
    _id: false,
    type: () => Geo
  })
  public geo: Geo;
}
