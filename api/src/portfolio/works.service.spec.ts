import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Schema } from 'mongoose';
import { mockMongooseModel, mockObjectId } from '../utils/mock';
import { Work } from './work.schema';
import { WorksService, CreateWorkDto } from './works.service';

const dto: CreateWorkDto = {
  name: 'test name',
  slug: 'test-slug',
  tags: [] as Schema.Types.ObjectId[],
  thumbnail: '/images/portfolio/t.jpg',
  screenshots: ['/images/portfolio/1.jpg'],
  description: 'test description',
  about: 'test about',
  techniques: ['TypeScript', 'React'],
  links: [{
    label: 'github',
    url: '#',
    description: 'label description',
  }],
};

describe('WorksService', () => {
  let module: TestingModule;
  let worksService: WorksService;
  let mockWorkModel: ReturnType<typeof mockMongooseModel>;

  beforeAll(async () => {
    mockWorkModel = mockMongooseModel([dto]);
    module = await Test
      .createTestingModule({
        providers: [
          WorksService,
          {
            provide: getModelToken(Work.name),
            useValue: mockWorkModel,
          },
        ],
      })
      .compile();
    worksService = module.get(WorksService);
  });

  afterAll(async () => {
    await module.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll()', () => {
    it('should call WorkModel.find() and exec()', async () => {
      const result = await worksService.getAll();
      expect(mockWorkModel.find).toBeCalled();
      expect(mockWorkModel.exec).toBeCalled();
      expect(result).toStrictEqual(await mockWorkModel.exec.mock.results[0].value);
    });
  });

  describe('getById()', () => {
    it('should call WorkModel.findById() and exec()', async () => {
      const id = mockObjectId();
      const result = await worksService.getById(id);
      expect(mockWorkModel.findById).toBeCalledWith(id);
      expect(mockWorkModel.exec).toBeCalled();
      expect(result).toStrictEqual(await mockWorkModel.exec.mock.results[0].value);
    });
  });

  describe('getBySlug()', () => {
    it('should call WorkModel.findBySlug() and exec()', async () => {
      const slug = 'test-slug';
      const result = await worksService.getBySlug(slug);
      expect(mockWorkModel.findOne).toBeCalledWith({ slug });
      expect(mockWorkModel.exec).toBeCalled();
      expect(result).toStrictEqual(await mockWorkModel.exec.mock.results[0].value);
    });
  });

  describe('create()', () => {
    it('should instantiate a new model and call save()', async () => {
      const spy = jest.spyOn(mockWorkModel.prototype, 'save');
      const result = await worksService.create(dto);
      expect(spy).toBeCalled();
      expect(result).toStrictEqual(await spy.mock.results[0].value);
    });
  });

  describe('deleteAll()', () => {
    it('should call Model.deleteMany({})', async () => {
      const spy = jest.spyOn(mockWorkModel, 'deleteMany')
        .mockResolvedValueOnce();
      await worksService.deleteAll();
      expect(spy).toBeCalledWith({});
    });
  });
});
