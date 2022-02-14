import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Tag } from './tag.schema';
import { WorkLink, WorkLinkSchema } from './work-link.schema';

/**
 * Schema for the documents of the portfolio projects.
 */
@Schema()
export class Work {
  /**
   * Work name / project title.
   */
  @Prop({ required: true })
  name: string;

  /**
   * Unique identifier that is used to make permalinks.
   */
  @Prop({ required: true, unique: true })
  slug: string;

  /**
   * IDs of the tags associated with the work.
   */
  @Prop({
    default: [],
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Tag' }],
  })
  tags: Tag[];

  /**
   * Typically, a thumbnail of the first screenshot.
   */
  @Prop({ required: true })
  thumbnail: string;

  /**
   * List of screenshot urls.
   */
  @Prop({ required: true, type: [String] })
  screenshots: string[];

  /**
   * A short note (1-2 lines) on the work.
   */
  @Prop({ required: true })
  description: string;

  /**
   * Full description of the work.
   */
  @Prop({ required: true })
  about: string;

  /**
   * List of technics used in the work, e.g. "UI/UX Design", "SASS", etc.
   */
  @Prop({ required: true, type: [String] })
  techniques: string[];

  /**
   * External links to the project source code, live website and so on.
   */
  @Prop({ type: [WorkLinkSchema], default: [] })
  links: WorkLink[];
}

export type WorkDocument = Work & Document;

export const WorkSchema = SchemaFactory.createForClass(Work);
