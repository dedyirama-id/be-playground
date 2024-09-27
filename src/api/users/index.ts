import { Router } from 'express';
import type { UseCaseInterface, validatorInterface } from './interface';
import { Controller } from './controller';
import { apiRouter } from './router';

export const UserApi = (useCase: UseCaseInterface, validator: validatorInterface): Router => {
  const router = Router();
  const controller = new Controller(useCase, validator);

  router.use(apiRouter(controller));
  return router;
};
