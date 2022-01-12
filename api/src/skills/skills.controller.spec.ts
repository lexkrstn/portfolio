import { Test } from '@nestjs/testing';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';

describe('SkillsController', () => {
  let controller: SkillsController;
  let getAll: jest.Mock;

  beforeEach(async () => {
    jest.useFakeTimers();
    getAll = jest.fn(() => Promise.resolve(['']));
    const module = await Test
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

  afterEach(() => { jest.useRealTimers(); });

  describe('list()', () => {
    it('should call SkillsService.getAll()', () => {
      controller.list();
      expect(getAll).toBeCalledTimes(1);
    });

    it('should be resolved with a non-empty array', async () => {
      const result = await controller.list();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
