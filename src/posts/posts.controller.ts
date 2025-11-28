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

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() createPostData: CreatePostDTO) {
    return this.postsService.createPost(createPostData);
  }

  @Get()
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
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @Patch()
  patchPost(@Body() patchPostData: PatchPostDTO) {
    return this.postsService.patchPost(patchPostData);
  }

  @Delete('/:id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
