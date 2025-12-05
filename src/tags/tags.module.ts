import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './providers/tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './tags.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [TypeOrmModule.forFeature([Tags]), PaginationModule],
  exports: [TagsService],
})
export class TagsModule {}
