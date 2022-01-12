import {
  Controller, Post, Body, HttpCode, UsePipes,
} from '@nestjs/common';
import * as joi from 'joi';
import { JoiValidationPipe } from '../pipes';
import { ContactService } from './contact.service';

export interface ContactDto {
  email: string;
  message: string;
}

const contactSchema = joi.object<ContactDto>({
  email: joi.string().email().required(),
  message: joi.string().min(3).required(),
});

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('api/v1/contact')
  @HttpCode(204)
  @UsePipes(new JoiValidationPipe(contactSchema))
  async send(@Body() dto: ContactDto) {
    await this.contactService.sendMail({
      from: dto.email,
      text: dto.message,
    });
  }
}
