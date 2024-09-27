import { type NextFunction, type Request, type Response } from 'express';
import { InvariantError } from '../../exceptions/InvariantError';
import tokenManager from '../../utils/tokenManager';
import type { ServiceInterface, UseCaseInterface } from './interface';
import config from '../../config';

export class Controller {
  constructor (private readonly useCase: UseCaseInterface, private readonly service: ServiceInterface) {}

  getOauthGoogleController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.redirect(this.service.authUri);
    } catch (error) {
      next(error);
    }
  };

  getOauthGoogleCallbackController = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { code } = req.query;

      if (code === undefined) {
        throw new InvariantError('Invalid login access');
      };

      const google: GoogleOauthDTO = await this.service.getUserToken(code as string);
      const userData = await this.service.getUserInfo(google.accessToken, google.idToken);

      if (userData?.email == null || userData.email.trim() === '') {
        throw new InvariantError('Invalid user info');
      }

      const user = await this.useCase.searchUserByEmail(userData.email);

      if (user !== null && user !== undefined) {
        res.redirect(`http://${config.app.host}:${config.app.port}/api/users/${user.id}`);
        return;
      }

      const newUser = await this.useCase.registerNewUser({
        username: userData.name,
        email: userData.email,
        password: ''
      });

      await this.useCase.updateUserGoogleConnection(newUser.id, google.refreshToken);

      const tokenPayload = {
        id: newUser.id
      };

      const accessToken = tokenManager.generateAccessToken(tokenPayload);
      const refreshToken = tokenManager.generateRefreshToken(tokenPayload);

      const responseBody: ResponseBodyDto = {
        status: 'success',
        data: {
          id: newUser.id,
          accessToken
        }
      };

      if (req.session !== null && req.session !== undefined) {
        req.session.refreshToken = refreshToken;
      } else {
        responseBody.warning = 'Cannot set refresh token to cookie';
      }

      return res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  };
}
