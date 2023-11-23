import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Component } from '../../../types/index.js';
import { ILogger } from '../../../libs/index.js';
import { IExceptionFilter } from '../types.js';
import { Request, Response, NextFunction } from 'express';

@injectable()
export class AppExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger
  ) {}

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}
