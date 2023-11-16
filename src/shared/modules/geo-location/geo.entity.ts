import { prop } from '@typegoose/typegoose';
import { IGeo } from '../../types/index.js';

export class Geo implements IGeo {
  @prop({ required: true })
  public latitude: number;

  @prop({ required: true })
  public longitude: number;
}
