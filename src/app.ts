import cores from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from './config';
import router from './router';

const app: Application = express();
app.use(cores());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(config.api_route as string, router);

app.use('/', (req, res) => {
  const message = `Server is running ${new Date()}`;
  res.status(httpStatus.OK).json({
    message,
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});

export default app;
