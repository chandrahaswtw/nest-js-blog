import { Injectable } from '@nestjs/common';
import { CreateMetaOptionDTO } from '../dto/create-metaoption.dto';

@Injectable()
export class MetaoptionsService {
  createMetaOption(createMetaOptionData: CreateMetaOptionDTO) {}

  getMetaOptions(page: number, count: number) {}

  getMetaOptionById(id: number) {}

  deleteMetaOption(id: number) {}
}
