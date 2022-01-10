import { Test } from '@nestjs/testing';
import { ContactEmail, ContactService } from './contact.service';
import { ContactController, ContactDto } from './contact.controller';

describe('ContactService', () => {
  let controller: ContactController;
  let sendMail: jest.Mock;

  beforeEach(async () => {
    jest.useFakeTimers();

    const module = await Test
      .createTestingModule({
        controllers: [ContactController],
      })
      .useMocker((token) => {
        if (token === ContactService) {
          sendMail = jest.fn(() => new Promise((resolve) => { setTimeout(resolve, 100); }));
          return { sendMail };
        }
        return undefined;
      })
      .compile();

    controller = module.get(ContactController);
  });

  afterEach(() => { jest.useRealTimers(); });

  describe('sendEmail()', () => {
    const dto: ContactDto = {
      email: 'test@host.com',
      message: 'test message',
    };
    const mailFixture: ContactEmail = {
      from: 'test@host.com',
      text: 'test message',
    };

    it('should call ContactService.sendMail()', async () => {
      const spy = jest.fn();
      controller.send(dto).then(spy);
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
