import { type NextFunction, type Request, type Response } from 'express';
import { type RepositoriesInterface, type validatorInterface } from './interface';
import { google } from 'googleapis';
import { InvariantError } from '../../exceptions/InvariantError';
import { getAuthorizationUrl, getOauth2Client } from '../../config/google';

export class Controller {
  constructor (private readonly repositories: RepositoriesInterface, private readonly validator: validatorInterface) {}

  getOauthGoogleController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authorizationUrl = await getAuthorizationUrl();
      res.redirect(authorizationUrl);
    } catch (error) {
      next(error);
    }
  };

  getOauthGoogleCallbackController = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { code } = req.query;
      const oauth2Client = await getOauth2Client();
      const { tokens } = await oauth2Client.getToken(code as string);

      oauth2Client.setCredentials(tokens);
      const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
      });

      const { data } = await oauth2.userinfo.get();

      if (data?.email == null || data.email.trim() === '') {
        throw new InvariantError('Invalid user info');
      }

      const user = await this.repositories.addUser({
        username: data.name ?? '',
        email: data.email,
        password: ''
      });

      return res.status(201).json({
        status: 'success',
        data: {
          id: user.id
        }
      });
    } catch (error) {
      next(error);
    }
  };
}
