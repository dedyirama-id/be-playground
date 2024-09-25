import { Router } from 'express';
import { Controller } from './controller';
import { UserRepositories } from '../../repositories/prisma/UserRepositories';
import { validator } from './validator';

const router: Router = Router();
const userRepositories = new UserRepositories();
const controller = new Controller(userRepositories, validator);

router.post('/', controller.postUserController);

export default router;
