import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument } from './tag.schema';

type OptionalTagKeys = never;
export type TagDto = Omit<Tag, OptionalTagKeys> & Partial<Pick<Tag, OptionalTagKeys>>;

@Injectable()
export class TagsService {
  public constructor(@InjectModel(Tag.name) private TagModel: Model<TagDocument>) {}

  /**
   * Returns all tag records from the database.
   */
  public async getAll(): Promise<Tag[]> {
    return this.TagModel.find().exec();
  }

  /**
   * Inserts new tag record into the database.
   */
  public async create(dto: TagDto) {
    const tag = new this.TagModel({ ...dto, });
    return tag.save();
  }

  /**
   * Deletes all tags from the database.
   */
  public async deleteAll() {
    await this.TagModel.deleteMany({});
  }
}
