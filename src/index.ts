import * as express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import { createConnection, Connection } from 'typeorm';
import userRouter from './routes/users';

createConnection().then((connection) => {
  const app: Application = express();
  app.use(bodyParser.json());

  app.use('/users', userRouter);

  app.listen(8000, () => {
    console.log('🔥🔥🔥 Server is listening on port 8000 🔥🔥🔥');
  });
});
