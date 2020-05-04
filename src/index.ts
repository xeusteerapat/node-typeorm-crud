import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import userRouter from './routes/users';

createConnection().then((connection) => {
  const app: Application = express();
  app.use(bodyParser.json());

  app.use('/users', userRouter);

  app.listen(8000, () => {
    console.log('🔥🔥🔥 Server is listening on port 8000 🔥🔥🔥');
  });
});
