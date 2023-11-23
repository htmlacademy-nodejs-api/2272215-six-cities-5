import { NextFunction, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../libs/index.js';
import { Component } from '../../types/index.js';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { CreateUserRequest } from './types.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController');
    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
  }

  public async create (
    _req: CreateUserRequest,
    _res: Response,
    _next: NextFunction,
  ): Promise<void> {
    throw new Error('UserController, Throw Error');
  }
}
