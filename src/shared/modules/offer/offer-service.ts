import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { ILogger } from '../../libs/index.js';
import { Component, SortTypes } from '../../types/index.js';
import { CreateOfferDto, UpdateOfferDto } from './offer-dto.js';
import { OfferEntity } from './offer-entity.js';
import { IOfferService } from './types.js';
import { DEFAULT_RETURN_OFFER_COUNT, MAX_RETURN_OFFER_COUNT } from './constants.js';

@injectable()
export class OfferService implements IOfferService {
  constructor(
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.Logger) private readonly logger: ILogger,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const newOffer = await this.offerModel.create(dto);
    this.logger.info(`New offer created: '${dto.title}'`);
    return newOffer;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async find(offerCount: number = DEFAULT_RETURN_OFFER_COUNT): Promise<DocumentType<OfferEntity>[]> {
    const _offerCount = offerCount > MAX_RETURN_OFFER_COUNT ? DEFAULT_RETURN_OFFER_COUNT : offerCount;
    return this.offerModel
      .find()
      .limit(_offerCount)
      .sort({ createdAt: SortTypes.Down })
      .populate(['userId'])
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async incrementCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': { commentCount: 1 }}, {new: true})
      .exec();
  }
}
