import path from 'path';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const DEBUG = process.env.NODE_ENV === 'development';

const { combine, timestamp, printf } = format;
const myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.message}`);

function createTransports(level: string) {
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

  return myTransports;
}

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  level: 'debug',
  transports: createTransports(DEBUG ? 'debug' : 'verbose'),
});

// Will be used by morgan logger
export const morganStream = {
  write(message: string) {
    logger.verbose(message.trim()); // remove trailing space
  },
};

export default logger;
