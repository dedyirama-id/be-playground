import dotenv from 'dotenv';
import type { Secret } from 'jsonwebtoken';
dotenv.config();

const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
    nodeEnv: (process.env.NODE_ENV === 'production')
  },
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authBaseUrl: 'https://accounts.google.com/o/oauth2/auth',
      redirectUri: `http://${process.env.HOST}:${process.env.PORT}/api/oauth/google/callback`,
      oauth2TokenEndPoint: 'https://oauth2.googleapis.com/token',
      googleapisUrl: 'https://www.googleapis.com/oauth2/v3/userinfo'
    }
  },
  jwt: {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY as Secret,
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY as Secret
  }
};

export default config;
