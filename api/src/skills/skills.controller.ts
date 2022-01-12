import { Controller, Get } from '@nestjs/common';
import { Skill } from './skill.schema';
import { SkillsService } from './skills.service';

@Controller()
export class SkillsController {
  public constructor(private readonly skillsService: SkillsService) {}

  @Get('api/v1/skills')
  public async list(): Promise<Skill[]> {
    return this.skillsService.getAll();
  }
}
