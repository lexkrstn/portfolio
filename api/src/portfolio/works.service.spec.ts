import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { omit } from 'lodash';
import { Schema } from 'mongoose';
import { mockMongooseModel, mockObjectId } from '../utils/mock';
import { Work } from './work.schema';
import { WorksService, CreateWorkDto } from './works.service';

const dto: CreateWorkDto = {
  name: 'test name',
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
const dtoDefaults: Partial<CreateWorkDto> = {};
const minDto = omit(dto, Object.keys(dtoDefaults)) as CreateWorkDto;

describe('WorksService', () => {
  let module: TestingModule;
  let worksService: WorksService;
  let mockWorkModel: ReturnType<typeof mockMongooseModel>;

  beforeAll(async () => {
    mockWorkModel = mockMongooseModel([{}]);
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
    it('should return non-empty list of works', async () => {
      const works = await worksService.getAll();
      expect(works).toBeInstanceOf(Array);
      expect(works.length).toBeGreaterThan(0);
    });
  });

  describe('getById()', () => {
    it('should return a work', async () => {
      const work = await worksService.getById(mockObjectId());
      expect(work).toBeDefined();
      expect(work).not.toBeNull();
    });
  });

  describe('create()', () => {
    it('should return the work with an _id', async () => {
      const doc = await worksService.create(dto);
      expect(omit(doc, '_id')).toMatchObject(dto);
    });

    it('should add default props', async () => {
      const doc = await worksService.create(minDto);
      expect(omit(doc, '_id')).toMatchObject({ ...minDto, ...dtoDefaults });
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
