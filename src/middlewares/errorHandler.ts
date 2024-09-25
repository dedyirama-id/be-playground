import { type Request, type Response, type NextFunction } from 'express';
import { ClientError } from '../exceptions/ClientError';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): any => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: err.message
    });
  }

  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Terjadi kesalahan pada server'
  });
};
