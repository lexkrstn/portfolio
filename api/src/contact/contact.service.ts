import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '../mail';
import { ContactConfig } from '../config';

interface ContactEmailWithoutMessage {
  from: string;
}

export interface TextContactEmail extends ContactEmailWithoutMessage {
  text: string;
}

export interface HtmlContactEmail extends ContactEmailWithoutMessage {
  html: string;
}

export type ContactEmail = TextContactEmail | HtmlContactEmail;

@Injectable()
export class ContactService {
  private contactConfig = this.configService.get<ContactConfig>('contact');

  public constructor(
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  public async sendMail(email: ContactEmail) {
    await this.mailerService.sendMail({
      to: this.contactConfig.email,
      subject: this.contactConfig.subject,
      ...email,
    });
  }
}
