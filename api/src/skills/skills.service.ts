import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from './skill.schema';

type OptionalSkillKeys = 'masteryYear' | 'group' | 'level' | 'weight';
export type SkillDto = Omit<Skill, OptionalSkillKeys> & Partial<Pick<Skill, OptionalSkillKeys>>;

@Injectable()
export class SkillsService {
  public constructor(@InjectModel(Skill.name) private SkillModel: Model<SkillDocument>) {}

  /**
   * Returns all skill records from the database.
   */
  public async getAll(): Promise<Skill[]> {
    return this.SkillModel.find().exec();
  }

  /**
   * Inserts new skill record into the database.
   */
  public async create(dto: SkillDto) {
    const defaults: Pick<Skill, OptionalSkillKeys> = {
      masteryYear: 0,
      group: 'basic',
      level: 5,
      weight: 0,
    };
    const skill = new this.SkillModel({
      ...defaults,
      ...dto,
    });
    return skill.save();
  }

  /**
   * Deletes all skills from the database.
   */
  public async deleteAll() {
    await this.SkillModel.deleteMany({});
  }
}
