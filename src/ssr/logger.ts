import { createLogger, format, transports } from 'winston';
import path from 'path';

import 'winston-daily-rotate-file';

const { combine, timestamp, printf } = format;

const DEBUG = process.env.NODE_ENV === 'development';

const myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.message}`);

let level = DEBUG ? 'debug' : 'info';

process.argv.slice(2).forEach(arg => {
  if (arg.startsWith('log=')) {
    level = arg.substring(4);
  }
});

const myTransports = [
  new transports.Console({
    format: combine(...[
      ...(DEBUG ? [format.colorize()] : []),
      timestamp(),
      myFormat,
    ]),
    level,
  }),
];

if (DEBUG) {
  myTransports.push(new ((transports as any).DailyRotateFile)({
    datePattern: 'YYYY-MM-DD',
    dirname: path.resolve(__dirname, '..', 'logs'),
    filename: 'ssr-%DATE%.log',
    maxFiles: '7d',
    zippedArchive: false,
  }));
}

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  level: 'debug',
  transports: myTransports,
});

// Will be used by morgan logger
export const morganStream = {
  write(message: string) {
    logger.verbose(message.trim()); // remove trailing space
  },
};

export default logger;
