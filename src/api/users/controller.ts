import { type NextFunction, type Request, type Response } from 'express';
import { type RepositoriesInterface, type validatorInterface } from './interface';
import type { UserDto } from '../../types/dto/userDto';

export class Controller {
  constructor (private readonly repositories: RepositoriesInterface, private readonly validator: validatorInterface) {}

  postUserController = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      this.validator.validatePostUserPayload(req.body as object);
      const { username, password, email } = req.body;

      const user: UserDto = await this.repositories.addUser({ username, password, email });

      return res.status(201).json({
        status: 'success',
        message: 'user created successfully',
        data: {
          id: user.id
        }
      });
    } catch (error) {
      next(error);
    }
  };

  getUserByIdController = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { id } = req.params;

      const user = await this.repositories.getUserById(id);
      return res.status(200).json({
        status: 'success',
        data: user
      });
    } catch (error) {
      next(error);
    }
  };

  putUserByIdController = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      this.validator.validatePutUserPayload(req.body as object);
      const { id } = req.params;
      const { username, email } = req.body;

      const user = await this.repositories.updateUserById(id, { username, email });
      return res.status(200).json({
        status: 'success',
        data: user
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUserByIdController = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      this.validator.validateDeleteUserPayload(req.body as object);
      const { id } = req.params;
      const { password }: { password: string } = req.body;

      await this.repositories.deleteUserById(id, password);
      return res.status(200).json({
        status: 'success'
      });
    } catch (error) {
      next(error);
    }
  };
}
