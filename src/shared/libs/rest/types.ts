import { Request, Response, Router, NextFunction } from 'express';

export enum HttpMethod {
  Get = 'get',
  Post = 'post',
  Delete = 'delete',
  Patch = 'patch',
  Put = 'put',
}

export interface IRoute {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
}

export interface IController {
  readonly router: Router;
  addRoute(route: IRoute): void;
  send<T>(res: Response, statusCode: number, data: T): void;
  ok<T>(res: Response, data: T): void;
  created<T>(res: Response, data: T): void;
  noContent<T>(res: Response, data: T): void;
}

export interface IExceptionFilter {
  catch(error: Error, req: Request, res: Response, next: NextFunction): void;
}
