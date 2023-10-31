import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { ILogger } from '../../libs/index.js';
import { Component } from '../../types/index.js';
import { CreateOfferDto } from './offer-dto.js';
import { OfferEntity } from './offer-entity.js';
import { IOfferService } from './types.js';

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

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(id).exec();
  }
}
