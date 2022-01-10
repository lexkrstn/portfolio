import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { Transporter } from 'nodemailer';
import { MailerConfig } from '../config';
import { Mail } from './mail.interface';

@Injectable()
export class MailerService {
  private transport: Transporter;

  public constructor(private configService: ConfigService) {
    const mailerConfig = this.configService.get<MailerConfig>('mailer');
    this.transport = nodemailer.createTransport(mailerConfig);
  }

  public async sendMail(mail: Mail) {
    return this.transport.sendMail(mail);
  }
}
