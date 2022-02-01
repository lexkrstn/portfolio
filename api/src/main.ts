import 'source-map-support/register';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
