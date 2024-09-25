import express from 'express';
import userRouter from './api/users';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const port = 3000;

// Top App Level Middlewares
app.use(express.json());

app.use('/api', userRouter);

// End App Level Middlewares
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
