import { type Request, type Response, type NextFunction } from 'express';
import { InvariantError } from '../exceptions/InvariantError';
import tokenManager from '../utils/tokenManager';

export const jwtVerificator = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authorization = req.headers.authorization;

    if (authorization === null || authorization === undefined) {
      throw new InvariantError('No token provided');
    }

    const parts = authorization.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new InvariantError('Invalid Authorization header format');
    }

    const accessToken = parts[1];
    const decoded = tokenManager.verify(accessToken);

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
