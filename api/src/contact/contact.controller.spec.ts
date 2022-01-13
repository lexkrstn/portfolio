import { Test, TestingModule } from '@nestjs/testing';
import { ContactEmail, ContactService } from './contact.service';
import { ContactController, ContactDto } from './contact.controller';

describe('ContactService', () => {
  let module: TestingModule;
  let controller: ContactController;
  let sendMail: jest.Mock;

  beforeEach(async () => {
    jest.useFakeTimers();

    module = await Test
      .createTestingModule({
        controllers: [ContactController],
      })
      .useMocker(token => {
        if (token === ContactService) {
          sendMail = jest.fn(() => new Promise(resolve => { setTimeout(resolve, 100); }));
          return { sendMail };
        }
        return undefined;
      })
      .compile();

    controller = module.get(ContactController);
  });

  afterEach(async () => {
    jest.useRealTimers();
    await module.close();
  });

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
