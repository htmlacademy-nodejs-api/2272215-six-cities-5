import { getModelForClass } from '@typegoose/typegoose';
import { OfferEntity } from './offer-entity.js';

export const offerModel = getModelForClass(OfferEntity);
