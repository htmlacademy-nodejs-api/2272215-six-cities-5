import { Response, Router} from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';
import { ILogger } from '../../index.js';
import { IController, IRoute } from '../types.js';
import { DEFAULT_CONTENT_TYPE } from './constants.js';

@injectable()
export abstract class BaseController implements IController {
  private readonly _router: Router;

  constructor(
    protected readonly logger: ILogger
  ) {
    this._router = Router();
  }

  public get router() {
    return this._router;
  }

  public addRoute(route: IRoute): void {
    this._router[route.method](route.path, route.handler.bind(this));
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }
}
