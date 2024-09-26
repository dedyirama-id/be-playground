import dotenv from 'dotenv';
dotenv.config();

const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT
  },
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
};

export default config;
