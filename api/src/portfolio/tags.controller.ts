import { Controller, Get } from '@nestjs/common';
import { Tag } from './tag.schema';
import { TagsService } from './tags.service';

@Controller()
export class TagsController {
  public constructor(private readonly tagsService: TagsService) {}

  @Get('api/v1/tags')
  public async list(): Promise<Tag[]> {
    return this.tagsService.getAll();
  }
}
