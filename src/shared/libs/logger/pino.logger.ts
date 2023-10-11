import {injectable } from 'inversify';
import { Logger as TPinoLogger, pino } from 'pino';
import { ILogger } from './logger.interfaces.js';

@injectable()
export class PinoLogger implements ILogger {
  private readonly logger: TPinoLogger;

  constructor() {
    this.logger = pino();
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }
}
