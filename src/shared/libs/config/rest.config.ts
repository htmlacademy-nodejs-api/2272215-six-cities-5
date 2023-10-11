import { config } from 'dotenv';
import { injectable } from 'inversify';
import { IConfig } from './config.interface.js';
import { RestSchema, validateRestSchema } from './rest.schema.js';

@injectable()
export class RestConfig implements IConfig<RestSchema> {
  private readonly config: RestSchema;

  constructor(
  ) {
    const parsedConfig = config();

    if(parsedConfig.error) {
      throw new Error('Failed to read .env file. Check if .env file exists');
    }

    validateRestSchema.load({});
    validateRestSchema.validate({ allowed: 'strict', output: console.info });

    this.config = validateRestSchema.getProperties();
    console.info('this.config=', this.config);
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
