import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerService } from './mail';
import config from './config';
import { ContactModule } from './contact';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    ContactModule,
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
