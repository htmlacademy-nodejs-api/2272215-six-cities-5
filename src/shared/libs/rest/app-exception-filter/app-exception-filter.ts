import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Component } from '../../../types/index.js';
import { ILogger } from '../../../libs/index.js';
import { createErrorObject } from '../../../utils/index.js';
import { HttpError } from '../errros/index.js';
import { IExceptionFilter } from '../types.js';

@injectable()
export class AppExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger
  ) {}

  public catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
    if(error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    }
    this.handleOtherError(error, req, res, next);
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[${error.detail}]: ${error.httpStatusCode} - ${error.message}`, error);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(error.message));
  }

  private handleOtherError(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(error.message));
  }
}
