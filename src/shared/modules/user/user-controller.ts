import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ILogger, IConfig, RestSchema } from '../../libs/index.js';
import { Component } from '../../types/index.js';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { fillDTO } from '../../utils/index.js';
import { CreateUserRequest, IUserService } from './types.js';
import { UserRdo } from './user-rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.UserService) private readonly userService: IUserService,
    @inject(Component.Config) private readonly configService: IConfig<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController');
    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
  }

  public async create (
    req: CreateUserRequest,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    const { body } = req;
    const foundUser = await this.userService.findByEmail(body.email);

    if(foundUser) {
      throw new HttpError(StatusCodes.CONFLICT, 'Cannot create user with such email');
    }

    const newUser = await this.userService.create(body, this.configService.get('SALT'));
    const userRdo = fillDTO(UserRdo, newUser);
    this.created(res, userRdo);
  }
}
