import 'source-map-support/register';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import fs from 'fs';
import path from 'path';
import { AppModule } from './app.module';

function getApplicationOptions(): NestApplicationOptions {
  let options: NestApplicationOptions;
  if (process.env.SSL_KEY && process.env.SSL_CERT) {
    const keyPath = path.isAbsolute(process.env.SSL_KEY)
      ? process.env.SSL_KEY
      : path.resolve(__dirname, process.env.SSL_KEY);
    const certPath = path.isAbsolute(process.env.SSL_CERT)
      ? process.env.SSL_CERT
      : path.resolve(__dirname, process.env.SSL_CERT);
    options = {
      httpsOptions: {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      },
    };
  }
  return options;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, getApplicationOptions());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.enableCors();
  const configService = await app.resolve(ConfigService);
  await app.listen(
    configService.get<number>('port'),
    configService.get<string>('host'),
  );
}
bootstrap();
