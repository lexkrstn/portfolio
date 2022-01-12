import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { ContactDto } from '../src/contact/contact.controller';
import { MailerService } from '../src/mail';

describe('ContactController (e2e)', () => {
  let app: INestApplication;
  let sendMail = jest.fn();

  beforeAll(async () => {
    const moduleFixture = await Test
      .createTestingModule({
        imports: [AppModule],
      })
      .overrideProvider(MailerService)
      .useValue({ sendMail })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/contact (POST)', () => {
    const dto: ContactDto = {
      email: 'test@gmail.com',
      message: 'test message',
    };

    it('should call MailerService.sendMail()', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/contact')
        .send(dto)
        .expect(204);
      expect(sendMail).toBeCalled();
    });

    it('should fail if invalid email sent', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/contact')
        .send({ ...dto, email: 'aaa' })
        .expect(400);
    });

    it('should fail if no message sent', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/contact')
        .send({ ...dto, message: '' })
        .expect(400);
    });
  });
});
