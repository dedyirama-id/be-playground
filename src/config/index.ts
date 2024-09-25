import dotenv from 'dotenv';
dotenv.config();

const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT
  }
};

export default config;
