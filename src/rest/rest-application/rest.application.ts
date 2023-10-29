import { inject, injectable } from 'inversify';
import { ILogger, IConfig, RestSchema, IDatabaseClient } from '../../shared/libs/index.js';
import { Component } from '../../shared/types/index.js';
import { getMongoURI } from '../../shared/utils/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<RestSchema>,
    @inject(Component.DatabaseClient) private readonly database: IDatabaseClient,
  ) {}

  public async init () {
    this.logger.info('Application initialized');
    this.logger.info(`$PORT: ${this.config.get('PORT')}`);
    // this.logger.debug('Application Debug');
    // this.logger.warn('Application Warn');
    // this.logger.error('Application Error', new Error('My New Error'));

    await this.initDabase();
  }

  private async initDabase() {
    const connString = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );
    await this.database.connect(connString);
  }
}
