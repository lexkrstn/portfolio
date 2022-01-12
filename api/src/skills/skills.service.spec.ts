import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { omit } from 'lodash';
import { mockMongooseModel } from '../utils/mock';
import { Skill } from './skill.schema';
import { SkillsService, SkillDto } from './skills.service';

const dto: SkillDto = {
  name: 'test name',
  icon: 'test icon',
  masteryYear: 2000,
  note: 'test note',
  group: 'misc',
  level: 3,
  weight: 42,
};
const dtoDefaults: Partial<SkillDto> = {
  masteryYear: 0,
  group: 'basic',
  level: 5,
  weight: 0,
};
const minDto = omit(dto, Object.keys(dtoDefaults)) as SkillDto;

describe('SkillsService', () => {
  let skillsService: SkillsService;
  let mockSkillModel: ReturnType<typeof mockMongooseModel>;

  beforeEach(async () => {
    mockSkillModel = mockMongooseModel(['']);
    const module = await Test
      .createTestingModule({
        providers: [
          SkillsService,
          {
            provide: getModelToken(Skill.name),
            useValue: mockSkillModel,
          },
        ],
      })
      .compile();
    skillsService = module.get(SkillsService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getAll()', () => {
    it('should return non-empty list of skills', async () => {
      const skills = await skillsService.getAll();
      expect(skills).toBeInstanceOf(Array);
      expect(skills.length).toBeGreaterThan(0);
    });
  });

  describe('create()', () => {
    it('should return the skill with an _id', async () => {
      const doc = await skillsService.create(dto);
      expect(omit(doc, '_id')).toMatchObject(dto);
    });

    it('should add default props', async () => {
      const doc = await skillsService.create(minDto);
      expect(omit(doc, '_id')).toMatchObject({ ...minDto, ...dtoDefaults });
    });
  });

  describe('deleteAll()', () => {
    it('should call Model.deleteMany({})', async () => {
      const spy = jest.spyOn(mockSkillModel, 'deleteMany')
        .mockResolvedValueOnce();
      await skillsService.deleteAll();
      expect(spy).toBeCalledWith({});
    });
  });
});
