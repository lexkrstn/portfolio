import { Controller, Get, Param } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ParseObjectIdPipe } from '../pipes';
import { WorkDocument } from './work.schema';
import { WorksService } from './works.service';

@Controller()
export class WorksController {
  public constructor(private readonly worksService: WorksService) {}

  @Get('api/v1/works')
  public async list(): Promise<WorkDocument[]> {
    return this.worksService.getAll();
  }

  @Get('api/v1/works/:id')
  public async get(@Param('id', ParseObjectIdPipe) id: string): Promise<WorkDocument> {
    return this.worksService.getById(new ObjectId(id));
  }
}
