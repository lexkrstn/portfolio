import { Test } from '@nestjs/testing';
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
  let contactService: ContactService;
  let sendMail: jest.Mock;

  beforeEach(async () => {
    jest.useFakeTimers();

    const module = await Test
      .createTestingModule({
        controllers: [ContactService, ConfigService],
      })
      .useMocker((token) => {
        if (token === MailerService) {
          sendMail = jest.fn(() => new Promise((resolve) => { setTimeout(resolve, 100); }));
          return { sendMail };
        }
        if (token === ConfigService) {
          return {
            get: jest.fn((path: string) => get(mockConfig, path)),
          };
        }
        return undefined;
      })
      .compile();

    contactService = module.get(ContactService);
  });

  afterEach(() => { jest.useRealTimers(); });

  describe('sendEmail()', () => {
    const contactFixture = {
      from: 'test@host.com',
      text: 'test message',
    };
    const mailFixture: Mail = {
      ...contactFixture,
      to: mockConfig.contact.email,
      subject: mockConfig.contact.subject,
    };

    it('should call MailerService.sendMail()', async () => {
      const spy = jest.fn();
      contactService.sendMail(contactFixture).then(spy);
      expect(sendMail).toHaveBeenCalledTimes(1);
      expect(sendMail.mock.calls[0][0]).toMatchObject(mailFixture);
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
