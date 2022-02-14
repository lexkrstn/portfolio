import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model, Schema } from 'mongoose';
import { WorkLink } from './work-link.schema';
import { Work, WorkDocument } from './work.schema';

type CreateWorkLinkDtoOptionalKeys = 'description';
type CreateWorkDtoOptionalKeys = 'tags' | 'links';

export type CreateWorkLinkDto = (
  Omit<WorkLink, CreateWorkLinkDtoOptionalKeys> &
  Partial<Pick<WorkLink, CreateWorkLinkDtoOptionalKeys>>
);

export type CreateWorkDto = (
  Omit<Work, CreateWorkDtoOptionalKeys> &
  Omit<Partial<Pick<Work, CreateWorkDtoOptionalKeys>>, 'links' | 'tags'> &
  { links?: CreateWorkLinkDto[] } &
  { tags?: Schema.Types.ObjectId[] }
);

@Injectable()
export class WorksService {
  constructor(@InjectModel(Work.name) private WorkModel: Model<WorkDocument>) {}

  async getAll(): Promise<WorkDocument[]> {
    return this.WorkModel.find().exec();
  }

  async getById(id: ObjectId): Promise<WorkDocument> {
    return this.WorkModel.findById(id).exec();
  }

  async getBySlug(slug: string): Promise<WorkDocument> {
    return this.WorkModel.findOne({ slug }).exec();
  }

  async create(dto: CreateWorkDto): Promise<WorkDocument> {
    const model = new this.WorkModel(dto);
    return model.save();
  }

  async deleteAll() {
    await this.WorkModel.deleteMany({});
  }
}
