import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { mockObjectId } from '../utils/mock';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';

const mockWorksService = {
  getAll: jest.fn(() => Promise.resolve([''])),
  getById: jest.fn(() => Promise.resolve({})),
  getBySlug: jest.fn(() => Promise.resolve({})),
};

describe('WorksController', () => {
  let module: TestingModule;
  let controller: WorksController;

  beforeAll(async () => {
    module = await Test
      .createTestingModule({
        imports: [CacheModule.register({ isGlobal: true })],
        controllers: [WorksController],
        providers: [{
          provide: WorksService,
          useValue: mockWorksService,
        }],
      })
      .compile();
    controller = module.get(WorksController);
  });

  afterAll(async () => {
    await module.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('list()', () => {
    it('should call WorksService.getAll()', async () => {
      await controller.list();
      expect(mockWorksService.getAll).toBeCalledTimes(1);
    });

    it('should be resolved with a non-empty array', async () => {
      const result = await controller.list();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('get()', () => {
    it('should call WorksService.getById()', async () => {
      await controller.get(mockObjectId().toString());
      expect(mockWorksService.getById).toBeCalledTimes(1);
    });

    it('should call WorksService.getBySlug()', async () => {
      await controller.get('arbitrary string');
      expect(mockWorksService.getBySlug).toBeCalledTimes(1);
    });

    it('should be resolved with an object', async () => {
      const result = await controller.list();
      expect(result).toBeInstanceOf(Object);
    });
  });
});
