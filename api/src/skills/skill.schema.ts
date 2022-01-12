import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Skill {
  @Prop() name: string;

  @Prop() icon: string;

  @Prop() masteryYear: number;

  @Prop() note: string;

  @Prop() group: 'basic' | 'misc' | 'lang';

  @Prop() level: number;

  @Prop() weight: number;
}

export type SkillDocument = Skill & Document;

export const SkillSchema = SchemaFactory.createForClass(Skill);
