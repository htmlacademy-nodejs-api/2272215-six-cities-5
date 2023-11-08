import { defaultClasses, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity, OfferEntity } from '../index.js';

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public text: string;

  @prop({
    required: true,
    ref: OfferEntity,
  })
  public offerId: Ref<OfferEntity>;

  @prop({
    required: true,
    ref: UserEntity,
  })
  public userId: Ref<UserEntity>;
}
