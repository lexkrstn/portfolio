import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Skill } from './skill.schema';
import { SkillsService } from './skills.service';

@Controller()
@UseInterceptors(CacheInterceptor)
export class SkillsController {
  public constructor(private readonly skillsService: SkillsService) {}

  @Get('api/v1/skills')
  public async list(): Promise<Skill[]> {
    return this.skillsService.getAll();
  }
}
