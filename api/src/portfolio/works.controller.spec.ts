import { Test, TestingModule } from '@nestjs/testing';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';

describe('WorksController', () => {
  let module: TestingModule;
  let controller: WorksController;
  let getAll: jest.Mock;

  beforeAll(async () => {
    jest.useFakeTimers();
    getAll = jest.fn(() => Promise.resolve(['']));
    module = await Test
      .createTestingModule({
        controllers: [WorksController],
        providers: [{
          provide: WorksService,
          useValue: { getAll },
        }],
      })
      .compile();
    controller = module.get(WorksController);
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
    it('should call WorksService.getAll()', async () => {
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
