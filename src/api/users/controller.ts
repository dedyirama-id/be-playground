import { type NextFunction, type Request, type Response } from 'express';
import { type UseCaseInterface, type validatorInterface } from './interface';

export class Controller {
  constructor (private readonly useCase: UseCaseInterface, private readonly validator: validatorInterface) {}

  postUserController = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      this.validator.validatePostUserPayload(req.body as object);
      const userData: PostUserDomain = req.body;
      const user = await this.useCase.registerNewUser(userData);

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

      const user = await this.useCase.getUserById(id);
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
      const newData: PostUserDomain = req.body;

      const user = await this.useCase.updateUserById(id, newData);
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

      await this.useCase.deleteUserById(id, password);
      return res.status(200).json({
        status: 'success'
      });
    } catch (error) {
      next(error);
    }
  };
}
