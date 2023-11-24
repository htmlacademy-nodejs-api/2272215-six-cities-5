import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../../types/index.js';
import { IController } from '../../../libs/index.js';
import { offerModel } from '../offer-model.js';
import { OfferEntity } from '../offer-entity.js';
import { OfferService } from '../offer-service.js';
import { OfferController } from '../offer-controller.js';
import { IOfferService } from '../types.js';

export function createOfferContainer() {
  const container = new Container();
  container.bind<IOfferService>(Component.OfferService).to(OfferService);
  container.bind<IController>(Component.OfferController).to(OfferController).inSingletonScope();
  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(offerModel);

  return container;
}
