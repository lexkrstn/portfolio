import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

describe('TagsController', () => {
  let module: TestingModule;
  let controller: TagsController;
  let getAll: jest.Mock;

  beforeAll(async () => {
    jest.useFakeTimers();
    getAll = jest.fn(() => Promise.resolve(['']));
    module = await Test
      .createTestingModule({
        imports: [CacheModule.register({ isGlobal: true })],
        controllers: [TagsController],
        providers: [{
          provide: TagsService,
          useValue: { getAll },
        }],
      })
      .compile();
    controller = module.get(TagsController);
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
    it('should call TagsService.getAll()', async () => {
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
