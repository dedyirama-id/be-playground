import config from '../config';
import { InvariantError } from '../exceptions/InvariantError';
import jwt from 'jsonwebtoken';

const tokenManager = {
  generateAccessToken: (payload: object): string => jwt.sign(payload, config.jwt.accessTokenKey, { algorithm: 'HS256', expiresIn: '15m' }),
  generateRefreshToken: (payload: object): string => jwt.sign(payload, config.jwt.refreshTokenKey, { algorithm: 'HS256', expiresIn: '30d' }),
  verify: (token: string) => {
    try {
      const decoded = jwt.verify(token, config.jwt.refreshTokenKey);
      return decoded;
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid');
    }
  }
};

export default tokenManager;
