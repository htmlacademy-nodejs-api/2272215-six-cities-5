import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { IOfferService } from './types.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });

  }

  public async index(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, offers);
  }

  public create(req: Request, res: Response): void {
    console.log('OfferController, create()');
  }
}
