import { Controller, Get } from '@nestjs/common';
import { Work } from './work.schema';
import { WorksService } from './works.service';

@Controller()
export class WorksController {
  public constructor(private readonly worksService: WorksService) {}

  @Get('api/v1/works')
  public async list(): Promise<Work[]> {
    return this.worksService.getAll();
  }
}
