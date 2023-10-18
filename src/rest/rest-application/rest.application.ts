import { inject, injectable } from 'inversify';
import { ILogger, IConfig, RestSchema } from '../../shared/libs/index.js';
import { Component } from '../../shared/types/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<RestSchema>,
  ) {}

  public init () {
    this.logger.info('Application initialized');
    this.logger.info(`$PORT: ${this.config.get('PORT')}`);
    // this.logger.debug('Application Debug');
    // this.logger.warn('Application Warn');
    // this.logger.error('Application Error', new Error('My New Error'));
  }
}
