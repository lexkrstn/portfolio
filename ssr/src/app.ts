import path from 'path';
import cookieParser from 'cookie-parser';
import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import { morganStream } from './logger';
import router from './router';

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const VIEWS_DIR = path.join(__dirname, '..', 'ssr', 'views')

export function createExpressApp(): Express {
  const app = express();

  // view engine setup
  app.disable('x-powered-by');
  app.set('views', VIEWS_DIR);
  app.set('view engine', 'pug');

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Request logger (which outputs to console)
  if (app.get('env') === 'development') {
    app.use(morgan('dev', {
      stream: morganStream, // log via winston logger
    }));
  }

  app.use(express.static(PUBLIC_DIR));

  app.use('/', router);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err: any = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err: any, req: Request, res: Response) => {
    res.status(err.status || 500);
    res.render('error', {
      // development error handler will print stacktrace
      error: app.get('env') === 'development' ? err : {},
      message: err.message,
    });
  });

  return app;
}
