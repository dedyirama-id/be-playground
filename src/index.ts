import express, { type Express } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { UserApi } from './api/users';
import { UserRepositories } from './repositories/prisma/userRepositories';
import { userValidator } from './validators/users';
import config from './config';
import { OauthApi } from './api/oauth';
import cookieSession from 'cookie-session';
import { UserUseCase } from './use-case/user';
import { AuthenticationRepositories } from './repositories/prisma/AuthenticationRepositories';
import { GoogleOauthService } from './services/oauth/GoogleOauth';

const app: Express = express();

// Repositories
const userRepositories = new UserRepositories();
const authenticationRepositories = new AuthenticationRepositories();

// Service
const googleOauthService = new GoogleOauthService();

;
// UseCase
const userUseCase = new UserUseCase(userRepositories, authenticationRepositories);

// API
const userApi = UserApi(userUseCase, userValidator);
const oauthApi = OauthApi(userUseCase, googleOauthService);

// Top App Level Middlewares
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: ['4942af86d5e22adf66713b9845a3af83'],
  maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days,
  secure: config.app.nodeEnv,
  httpOnly: true
}));

app.use('/api', userApi);
app.use('/api', oauthApi);

// End App Level Middlewares
app.use(errorHandler);

const server = app.listen(config.app.port, () => {
  console.log(`Server berjalan di http://localhost:${config.app.port}`);
});

export { app, server };
