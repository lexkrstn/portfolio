import { CacheInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
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
