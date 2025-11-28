import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDTO } from '../dto/create-post.dto';
import { PatchPostDTO } from '../dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './../posts.entity';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
  ) {}
  async createPost(createPostData: CreatePostDTO) {
    const user = await this.usersService.getUserById(createPostData.authorId);
    if (!user) {
      throw new BadRequestException(
        `User with id ${createPostData.authorId} is not found`,
      );
    }
    const newPost = this.postRepository.create({ ...createPostData });
    newPost.author = user;

    // Tags
    if (createPostData.tagIds) {
      const tags = await this.tagsService.getTagsByIds(createPostData.tagIds);
      newPost.tags = tags;
    }

    return this.postRepository.save(newPost);
  }

  getPosts(page: number, count: number) {
    return this.postRepository.find({
      take: count,
      skip: (page - 1) * 10,
      relations: { metaOption: true, author: true, tags: true },
    });
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({
      where: [{ id }],
      relations: { metaOption: true, author: true, tags: true },
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} is not found`);
    }

    return post;
  }

  async patchPost(patchPostData: PatchPostDTO) {
    const post = await this.postRepository.findOneBy({ id: patchPostData.id });
    if (!post) {
      throw new NotFoundException(
        `Post with id ${patchPostData.id} is not found`,
      );
    }
    const updated = this.postRepository.merge(post, patchPostData);
    return this.postRepository.save(updated);
  }

  async deletePost(id: number) {
    const post = await this.postRepository.findOneBy({ id: id });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} is not found`);
    }
    await this.postRepository.remove(post);
    return {
      delete: 'success',
      id,
    };
  }
}
