import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Schema } from 'mongoose';
import { AppModule } from '../src/app.module';
import { TagsService, Tag, CreateWorkDto, WorksService } from '../src/portfolio';
import { omitUnderscoredProps } from '../src/utils';

const tagsFixture: Tag[] = [{
  name: 'test name',
}];

const worksFixture: CreateWorkDto[] = [{
  name: 'test name',
  tags: [] as Schema.Types.ObjectId[],
  thumbnail: '/images/portfolio/t.jpg',
  screenshots: ['/images/portfolio/1.jpg'],
  description: `test description`,
  about: 'test about',
  techniques: ['TypeScript', 'React'],
  links: [{
    label: 'github',
    url: '#',
    description: 'label description',
  }],
}];

describe('TagsController (e2e)', () => {
  let app: INestApplication;
  let tagsService: TagsService;
  let worksService: WorksService;

  beforeAll(async () => {
    const moduleFixture = await Test
      .createTestingModule({
        imports: [AppModule],
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    tagsService = moduleFixture.get(TagsService);
    worksService = moduleFixture.get(WorksService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/tags (GET)', () => {
    beforeEach(async () => {
      await tagsService.create(tagsFixture[0]);
    });

    afterEach(async () => {
      await tagsService.deleteAll();
    });

    it('should return fixture', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/tags')
        .expect(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toEqual(tagsFixture.length);
      expect(omitUnderscoredProps(res.body)).toEqual(tagsFixture);
    });
  });

  describe('/works (GET)', () => {
    beforeEach(async () => {
      await worksService.create(worksFixture[0]);
    });

    afterEach(async () => {
      await worksService.deleteAll();
    });

    it('should return fixture', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/works')
        .expect(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toEqual(worksFixture.length);
      expect(omitUnderscoredProps(res.body)).toEqual(worksFixture);
    });
  });
});
