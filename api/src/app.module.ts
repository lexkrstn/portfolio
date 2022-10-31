import { Module, Global, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import path from 'path';
import { MailerService } from './mail';
import config from './config';
import { ContactModule } from './contact';
import { SkillsModule } from './skills';
import { PortfolioModule } from './portfolio';
import { HealthModule } from './health/health.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '..', '..', '.env'),
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('cache.ttl'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    ContactModule,
    SkillsModule,
    PortfolioModule,
    HealthModule,
  ],
  providers: [
    MailerService,
  ],
  exports: [
    MailerService,
  ],
})
export class AppModule {}
