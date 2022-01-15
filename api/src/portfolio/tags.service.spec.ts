import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { omit } from 'lodash';
import { mockMongooseModel } from '../utils/mock';
import { Tag } from './tag.schema';
import { TagsService, TagDto } from './tags.service';

const dto: TagDto = { name: 'test name' };
const dtoDefaults: Partial<TagDto> = {};
const minDto = omit(dto, Object.keys(dtoDefaults)) as TagDto;

describe('TagsService', () => {
  let module: TestingModule;
  let tagsService: TagsService;
  let mockTagModel: ReturnType<typeof mockMongooseModel>;

  beforeAll(async () => {
    mockTagModel = mockMongooseModel(['']);
    module = await Test
      .createTestingModule({
        providers: [
          TagsService,
          {
            provide: getModelToken(Tag.name),
            useValue: mockTagModel,
          },
        ],
      })
      .compile();
    tagsService = module.get(TagsService);
  });

  afterAll(async () => {
    await module.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll()', () => {
    it('should return non-empty list of tags', async () => {
      const tags = await tagsService.getAll();
      expect(tags).toBeInstanceOf(Array);
      expect(tags.length).toBeGreaterThan(0);
    });
  });

  describe('create()', () => {
    it('should return the tag with an _id', async () => {
      const doc = await tagsService.create(dto);
      expect(omit(doc, '_id')).toMatchObject(dto);
    });

    it('should add default props', async () => {
      const doc = await tagsService.create(minDto);
      expect(omit(doc, '_id')).toMatchObject({ ...minDto, ...dtoDefaults });
    });
  });

  describe('deleteAll()', () => {
    it('should call Model.deleteMany({})', async () => {
      const spy = jest.spyOn(mockTagModel, 'deleteMany')
        .mockResolvedValueOnce();
      await tagsService.deleteAll();
      expect(spy).toBeCalledWith({});
    });
  });
});
