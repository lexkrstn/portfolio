import {
  CacheInterceptor, Controller, Get, NotFoundException, Param, UseInterceptors,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { isObjectId } from '../utils';
import { WorkDocument } from './work.schema';
import { WorksService } from './works.service';

@Controller('api/v1/works')
@UseInterceptors(CacheInterceptor)
export class WorksController {
  public constructor(private readonly worksService: WorksService) {}

  @Get('/')
  public async list(): Promise<WorkDocument[]> {
    return this.worksService.getAll();
  }

  @Get('/:slugOrId')
  public async get(@Param('slugOrId') slugOrId: string): Promise<WorkDocument> {
    const work = isObjectId(slugOrId)
      ? await this.worksService.getById(new ObjectId(slugOrId))
      : await this.worksService.getBySlug(slugOrId);
    if (!work) {
      throw new NotFoundException(`Work ${slugOrId} not found`);
    }
    return work;
  }
}
