import {
  Controller,
  Post,
  Get,
  Query,
  Patch,
  Delete,
  ParseIntPipe,
  Param,
  Body,
  DefaultValuePipe,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { PatchPostDTO } from './dto/update-post.dto';
import { NonNegativeIntPipe } from './../utils/pipes/nonNegativePipe';
import { ApiParam, ApiQuery, ApiOperation } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create post' })
  createPost(@Body() createPostData: CreatePostDTO) {
    return this.postsService.createPost(createPostData);
  }

  @Get()
  @ApiOperation({ summary: 'Get posts' })
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
  getPosts(
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
    return this.postsService.getPosts(page, count);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get post by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
    description: 'Enter the id to fetch',
  })
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Patch post' })
  patchPost(@Body() patchPostData: PatchPostDTO) {
    return this.postsService.patchPost(patchPostData);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Get post by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
    description: 'Enter the id to delete',
  })
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
