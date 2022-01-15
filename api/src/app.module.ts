import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerService } from './mail';
import config from './config';
import { ContactModule } from './contact';
import { SkillsModule } from './skills';
import { PortfolioModule } from './portfolio';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '..', '..', '.env'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        dbName: configService.get<string>('database.name'),
      }),
      inject: [ConfigService],
    }),
    ContactModule,
    SkillsModule,
    PortfolioModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    MailerService,
  ],
  exports: [
    AppService,
    MailerService,
  ],
})
export class AppModule {}
