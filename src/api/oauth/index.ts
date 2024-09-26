import { Router } from 'express';
import type { RepositoriesInterface, validatorInterface } from './interface';
import { Controller } from './controller';
import { apiRouter } from './router';

export class OauthApi {
  readonly router: Router = Router();

  constructor (private readonly repositories: RepositoriesInterface, private readonly validator: validatorInterface) {
    const controller = new Controller(repositories, validator);

    this.router.use(apiRouter(controller));
  }
}
