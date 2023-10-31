import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './offer-dto.js';
import { OfferEntity } from './offer-entity.js';

export interface IOfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
}
