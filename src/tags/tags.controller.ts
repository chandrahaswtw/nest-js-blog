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
import { NonNegativeIntPipe } from './../utils/pipes/nonNegativePipe';
import { ApiParam, ApiQuery, ApiOperation } from '@nestjs/swagger';

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
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: true,
    example: 1,
    description: 'Enter the page number',
  })
  @ApiQuery({
    name: 'count',
    type: 'number',
    required: true,
    example: 5,
    description: 'Enter the page count',
  })
  getTags(
    @Query(
      'page',
      new DefaultValuePipe(1),
      ParseIntPipe,
      new NonNegativeIntPipe('page'),
    )
    page: number,
    @Query(
      'count',
      new DefaultValuePipe(10),
      ParseIntPipe,
      new NonNegativeIntPipe('count'),
    )
    count: number,
  ) {
    return this.tagsService.getTags(page, count);
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
