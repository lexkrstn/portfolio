import 'source-map-support/register';
import path from 'path';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import http from 'http';
import morgan from 'morgan';

import logger, { morganStream } from './logger';
import router from './router';

export const app = express();

app.set('port', parseInt(process.env.PORT, 10) || 8080);
// view engine setup
app.disable('x-powered-by');
app.set('views', path.join(__dirname, '..', 'ssr', 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', 'public')));

// Request logger (which outputs to console)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev', {
    stream: morganStream, // log via winston logger
  }));
}

app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: any, req: Request, res: Response) => {
    res.status(err.status || 500);
    res.render('error', {
      error: err,
      message: err.message,
    });
  });
}

// production error handler with no stacktraces leaked to user
app.use((err: any, req: Request, res: Response) => {
  res.status(err.status || 500);
  res.render('error', {
    error: {},
    message: err.message,
  });
});

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(8080, '127.0.0.1');

// Handle specific listen errors with friendly messages
server.on('error', (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const port = app.get('port');

  switch (error.code) {
    case 'EACCES':
      logger.error(port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info('Server-Side-Renderer is listening on ' + bind);
});
