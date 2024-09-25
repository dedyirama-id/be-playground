import { Router } from 'express';
import type { Controller } from './controller';

export function apiRouter (controller: Controller): Router {
  const router = Router();

  router.post('/users/', controller.postUserController);
  router.get('/users/:id', controller.getUserByIdController);
  router.put('/users/:id', controller.putUserByIdController);
  router.delete('/users/:id', controller.deleteUserByIdController);

  return router;
}
