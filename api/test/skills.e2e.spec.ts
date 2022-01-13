import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Skill, SkillsService } from '../src/skills';
import { omitUnderscoredProps } from '../src/utils';

const skillsFixture: Skill[] = [{
  name: 'test name',
  icon: 'test icon',
  masteryYear: 2000,
  note: 'test note',
  group: 'misc',
  level: 3,
  weight: 42,
}];

describe('SkillsController (e2e)', () => {
  let app: INestApplication;
  let skillsService: SkillsService;

  beforeAll(async () => {
    const moduleFixture = await Test
      .createTestingModule({
        imports: [AppModule],
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    skillsService = moduleFixture.get(SkillsService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/skills (GET)', () => {
    beforeEach(async () => {
      await skillsService.create(skillsFixture[0]);
    });

    afterEach(async () => {
      await skillsService.deleteAll();
    });

    it('should return fixture', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/skills')
        .expect(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toEqual(skillsFixture.length);
      expect(omitUnderscoredProps(res.body)).toEqual(skillsFixture);
    });
  });
});
