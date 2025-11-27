import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDTO } from '../dto/create-post.dto';
import { PatchPostDTO } from '../dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './../posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}
  createPost(createPostData: CreatePostDTO) {
    const newPost = this.postRepository.create({ ...createPostData });
    return this.postRepository.save(newPost);
  }

  getPosts(page: number, count: number) {
    return this.postRepository.find({
      take: count,
      skip: (page - 1) * 10,
      relations: { metaOption: true },
    });
  }

  async getPostById(id: number) {
    const posts = await this.postRepository.find({
      where: [{ id }],
      relations: { metaOption: true },
    });

    if (posts.length) {
      return posts[0];
    }
    throw new NotFoundException(`Post with id ${id} is not found`);
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
