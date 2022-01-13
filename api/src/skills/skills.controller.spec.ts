import { Test, TestingModule } from '@nestjs/testing';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';

describe('SkillsController', () => {
  let module: TestingModule;
  let controller: SkillsController;
  let getAll: jest.Mock;

  beforeAll(async () => {
    jest.useFakeTimers();
    getAll = jest.fn(() => Promise.resolve(['']));
    module = await Test
      .createTestingModule({
        controllers: [SkillsController],
        providers: [{
          provide: SkillsService,
          useValue: { getAll },
        }],
      })
      .compile();
    controller = module.get(SkillsController);
  });

  afterAll(async () => {
    jest.useRealTimers();
    await module.close();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe('list()', () => {
    it('should call SkillsService.getAll()', async () => {
      await controller.list();
      expect(getAll).toBeCalledTimes(1);
    });

    it('should be resolved with a non-empty array', async () => {
      const result = await controller.list();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
