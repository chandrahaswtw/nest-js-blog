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
import { ApiParam, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { GetPostsDTO } from './dto/get-posts.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create post' })
  createPost(
    @Body() createPostData: CreatePostDTO,
    @CurrentUser('userId') userid: number,
  ) {
    return this.postsService.createPost(createPostData, userid);
  }

  @Get()
  @ApiOperation({ summary: 'Get posts' })
  getPosts(@Query() getPostsQuery: GetPostsDTO) {
    return this.postsService.getPosts(getPostsQuery);
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
