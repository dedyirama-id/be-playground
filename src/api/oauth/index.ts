import { Router } from 'express';
import { Controller } from './controller';
import { apiRouter } from './router';
import type { ServiceInterface, UseCaseInterface } from './interface';

export const OauthApi = (useCase: UseCaseInterface, service: ServiceInterface): Router => {
  const router = Router();
  const controller = new Controller(useCase, service);

  router.use(apiRouter(controller));
  return router;
};
