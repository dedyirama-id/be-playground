import { Router } from 'express';
import type { Controller } from './controller';

export function apiRouter (controller: Controller): Router {
  const router = Router();

  router.get('/oauth/google', controller.getOauthGoogleController);
  router.get('/oauth/google/callback', controller.getOauthGoogleCallbackController);

  return router;
}
