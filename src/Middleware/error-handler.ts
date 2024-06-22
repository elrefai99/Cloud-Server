import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../Common/exceptions/http-exception';

export function errorHandler(err: HttpException, req: Request, res: Response, _next: NextFunction) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ statusCode: status, timestamp: new Date().toISOString(), path: req.url, message: message });
}
