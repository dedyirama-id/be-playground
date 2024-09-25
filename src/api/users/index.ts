import { Router } from 'express';
import router from './router';

const userRouter: Router = Router();

userRouter.use('/users', router);

export default userRouter;
