import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTagDTO } from '../dto/create-tags.dto';
import { Tags } from './../tags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags) private readonly tagsRepository: Repository<Tags>,
  ) {}
  createTag(createTagData: CreateTagDTO) {
    const tag = this.tagsRepository.create(createTagData);
    return this.tagsRepository.save(tag);
  }

  getTags(page: number, count: number) {
    return this.tagsRepository.find({
      take: count,
      skip: (page - 1) * 10,
      relations: { posts: true },
    });
  }

  async getTagById(id: number) {
    const tag = await this.tagsRepository.findOne({
      where: { id },
      relations: { posts: true },
    });
    if (!tag) {
      throw new BadRequestException(`Tag with id: ${id} is not found`);
    }
    return tag;
  }

  async getTagsByIds(ids: number[]) {
    return await this.tagsRepository.find({ where: { id: In(ids) } });
  }

  async deleteTag(id: number) {
    const tag = await this.tagsRepository.findOne({ where: { id } });
    if (!tag) {
      throw new BadRequestException(`Tag with id: ${id} is not found`);
    }
    await this.tagsRepository.remove(tag);
    return {
      delete: 'success',
      id,
    };
  }
}
