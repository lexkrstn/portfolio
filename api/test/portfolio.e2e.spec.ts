import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { TagsService, Tag } from '../src/portfolio';
import { omitUnderscoredProps } from '../src/utils';

const tagsFixture: Tag[] = [{
  name: 'test name',
}];

describe('TagsController (e2e)', () => {
  let app: INestApplication;
  let tagsService: TagsService;

  beforeAll(async () => {
    const moduleFixture = await Test
      .createTestingModule({
        imports: [AppModule],
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    tagsService = moduleFixture.get(TagsService);
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
});
