import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './tag.schema';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { Work, WorkSchema } from './work.schema';
import { WorksController } from './works.controller';
import { WorksService } from './works.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tag.name, schema: TagSchema },
      { name: Work.name, schema: WorkSchema },
    ]),
  ],
  controllers: [TagsController, WorksController],
  providers: [TagsService, WorksService],
})
export class PortfolioModule {}
