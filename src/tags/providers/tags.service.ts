import { Injectable } from '@nestjs/common';
import { CreateTagDTO } from '../dto/create-tags.dto';

@Injectable()
export class TagsService {
  createTag(createTagData: CreateTagDTO) {}

  getTags(page: number, count: number) {}

  getTagById(id: number) {}

  deleteTag(id: number) {}
}
