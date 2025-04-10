import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Tag } from './tag.schema';
import { TagsService } from './tags.service';

@Controller()
@UseInterceptors(CacheInterceptor)
export class TagsController {
  public constructor(private readonly tagsService: TagsService) {}

  @Get('api/v1/tags')
  public async list(): Promise<Tag[]> {
    return this.tagsService.getAll();
  }
}
