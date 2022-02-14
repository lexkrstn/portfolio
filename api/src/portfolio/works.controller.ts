import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { isObjectId } from '../utils';
import { WorkDocument } from './work.schema';
import { WorksService } from './works.service';

@Controller()
export class WorksController {
  public constructor(private readonly worksService: WorksService) {}

  @Get('api/v1/works')
  public async list(): Promise<WorkDocument[]> {
    return this.worksService.getAll();
  }

  @Get('api/v1/works/:slugOrId')
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
