import * as Mongoose from 'mongoose';
import { injectable, inject } from 'inversify';
import { Component } from '../../../types/app/index.js';
import { getErrorMessage } from '../../../utils/get-error-message.js';
import { ILogger} from '../../logger/index.js';
import { IDatabaseClient} from '../types.js';

type TMongoose = typeof Mongoose;

@injectable()
export class MongoDatabaseClient implements IDatabaseClient {
  private _mongoose: TMongoose | null;
  private _isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
  ) {
    this._mongoose = null;
    this._isConnected = false;
  }

  public async connect(uri: string): Promise<void> {
    if(this._isConnected) {
      this.logger.info('Already connected to Database');
      return;
    }

    try {
      this._mongoose = await Mongoose.connect(uri);
      this._isConnected = true;
      this.logger.info('Connected to Database');
    } catch(error) {
      const errorMessage = getErrorMessage(error, 'Failed to connect to Database');
      throw new Error(errorMessage);
    }
  }

  public async disconnect(): Promise<void> {
    if(!this._isConnected) {
      this.logger.info('Not connected to Database');
      return;
    }

    await this._mongoose?.disconnect();
    this._isConnected = false;
    this.logger.info('Disconnected from Database');
  }

  public isConnected() {
    return this._isConnected;
  }
}
