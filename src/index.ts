import express, { type Express } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { UserApi } from './api/users';
import { UserRepositories } from './repositories/prisma/userRepositories';
import { userValidator } from './validators/users';
import config from './config';
import { OauthApi } from './api/oauth';

const app: Express = express();

// Repositories
const userRepositories = new UserRepositories();

// API
const userApi = new UserApi(userRepositories, userValidator);
const oauthApi = new OauthApi(userRepositories, userValidator);

// Top App Level Middlewares
app.use(express.json());

app.use('/api', userApi.router);
app.use('/api', oauthApi.router);

// End App Level Middlewares
app.use(errorHandler);

const server = app.listen(config.app.port, () => {
  console.log(`Server berjalan di http://localhost:${config.app.port}`);
});

export { app, server };
