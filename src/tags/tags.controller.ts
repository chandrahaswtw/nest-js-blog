import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  ParseIntPipe,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDTO } from './dto/create-tags.dto';
import { ApiParam, ApiOperation } from '@nestjs/swagger';
import { PaginateQueryDTO } from 'src/common/pagination/dto/paginate-query.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({ summary: 'Create tag' })
  createTag(@Body() createTagData: CreateTagDTO) {
    return this.tagsService.createTag(createTagData);
  }

  @Get()
  @ApiOperation({ summary: 'Get tags' })
  getTags(@Query() getTagsQueryData: PaginateQueryDTO) {
    return this.tagsService.getTags(getTagsQueryData);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get meta option by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
    description: 'Enter the id to fetch',
  })
  getTagById(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.getTagById(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete meta option by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
    description: 'Enter the id to fetch',
  })
  deleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.deleteTag(id);
  }
}
