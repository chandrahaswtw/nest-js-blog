import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDTO } from './dto/create-tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  createTag(@Body() createTagData: CreateTagDTO) {
    return this.tagsService.createTag(createTagData);
  }

  @Get()
  getTags(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('count', new DefaultValuePipe(10), ParseIntPipe) count: number,
  ) {
    return this.tagsService.getTags(page, count);
  }

  @Get('/:id')
  getTagById(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.getTagById(id);
  }

  @Delete('/:id')
  deleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.deleteTag(id);
  }
}
