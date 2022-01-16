import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/**
 * A Work's subdocument representing an external link.
 */
@Schema({ _id: false })
export class WorkLink {
  /**
   * Link text.
   */
  @Prop({ required: true })
  label: string;

  /**
   * Link address.
   */
  @Prop({ required: true })
  url: string;

  /**
   * Short link description, e.g. "Access the project's source on".
   */
  @Prop()
  description: string;
}

export const WorkLinkSchema = SchemaFactory.createForClass(WorkLink);
