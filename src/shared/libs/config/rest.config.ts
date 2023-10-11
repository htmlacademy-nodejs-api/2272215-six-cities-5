import { config } from 'dotenv';
import { injectable, inject } from 'inversify';
import { Component } from '../../types/index.js';
import { ILogger } from '../logger/index.js';
import { IConfig } from './config.interface.js';
import { RestSchema, validateRestSchema } from './rest.schema.js';

@injectable()
export class RestConfig implements IConfig<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger
  ) {
    const parsedConfig = config();

    if(parsedConfig.error) {
      throw new Error('Failed to read .env file. Check if .env file exists');
    }

    validateRestSchema.load({});
    validateRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = validateRestSchema.getProperties();
    this.logger.info('.env file successfully parsed!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
