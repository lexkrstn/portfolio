import 'source-map-support/register';
import { Express } from 'express';
import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';
import logger from './logger';
import config from './config';

function getHttpsServerOptions() {
  let { certPath, keyPath } = config.ssl;
  if (!path.isAbsolute(certPath)) certPath = path.resolve(__dirname, certPath);
  if (!path.isAbsolute(keyPath)) keyPath = path.resolve(__dirname, keyPath);
  return {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };
}

export function createServer(app: Express): http.Server | https.Server {
  // Create HTTP server.
  const server = config.ssl.enabled
    ? https.createServer(getHttpsServerOptions(), app)
    : http.createServer(app);

  // Listen on provided port, on all network interfaces.
  server.listen(config.port, config.host);

  // Handle specific listen errors with friendly messages
  server.on('error', (error: any) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const address = server.address();
    const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;

    switch (error.code) {
      case 'EACCES':
        logger.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  server.on('listening', () => {
    logger.info(`Server-Side-Renderer is listening on ${config.host}:${config.port}`);
  });

  return server;
}
