import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  beforeAll(async () => {
    await module.close();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = module.get<AppController>(AppController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
