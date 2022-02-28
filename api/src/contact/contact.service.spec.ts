import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { get } from 'lodash';
import { ContactService } from './contact.service';
import { MailerService, Mail } from '../mail';
import { Config } from '../config';

const mockConfig: Pick<Config, 'contact'> = {
  contact: {
    email: 'mytest@email.com',
    subject: 'test subject',
  },
};

describe('ContactService', () => {
  let module: TestingModule;
  let contactService: ContactService;
  let sendMail: jest.Mock;

  beforeAll(async () => {
    sendMail = jest.fn(() => new Promise(resolve => { setTimeout(resolve, 100); }));
    module = await Test
      .createTestingModule({
        providers: [
          ContactService,
          {
            provide: MailerService,
            useValue: { sendMail },
          },
          {
            provide: ConfigService,
            useValue: { get: (path: string) => get(mockConfig, path) },
          },
        ],
      })
      .compile();
    contactService = module.get(ContactService);
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe('sendEmail()', () => {
    const contactFixture = {
      from: 'test@host.com',
      text: 'test message',
    };
    const mailFixture: Mail = {
      from: 'test@host.com',
      to: mockConfig.contact.email,
      subject: mockConfig.contact.subject,
      text: 'test message\n\nFrom: test@host.com',
    };

    it('should call MailerService.sendMail()', async () => {
      const spy = jest.fn();
      contactService.sendMail(contactFixture).then(spy);
      expect(sendMail).toBeCalledTimes(1);
      expect(sendMail).toBeCalledWith(mailFixture);
      expect(spy).not.toHaveBeenCalled();
      jest.advanceTimersToNextTimer();
      for (let i = 0; i < 10; i++) {
        // flush microtask queue
        await Promise.resolve(); // eslint-disable-line no-await-in-loop
      }
      expect(spy).toHaveBeenCalled();
    });
  });
});
