import { type NextFunction, type Request, type Response } from 'express';
import { type UserRepositoriesInterface, type validatorInterface } from './interface';
import type { UserDto } from '../../types/dto/userDto';

export class Controller {
  constructor (private readonly repositories: UserRepositoriesInterface, private readonly validator: validatorInterface) {}

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
}
