import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMetaOptionDTO } from '../dto/create-metaoption.dto';
import { Metaoptions } from './../metaoptions.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaoptionsService {
  constructor(
    @InjectRepository(Metaoptions)
    private readonly metaOptionsRepository: Repository<Metaoptions>,
  ) {}
  createMetaOption(createMetaOptionData: CreateMetaOptionDTO) {
    const newMetaOption =
      this.metaOptionsRepository.create(createMetaOptionData);
    return this.metaOptionsRepository.save(newMetaOption);
  }

  getMetaOptions(page: number, count: number) {
    return this.metaOptionsRepository.find({
      take: count,
      skip: (page - 1) * 10,
    });
  }

  async getMetaOptionById(id: number) {
    const metaoption = await this.metaOptionsRepository.findOne({
      where: { id },
      relations: { post: true },
    });
    if (!metaoption) {
      throw new BadRequestException(
        `The metaOption with id: ${id} doesn't exist`,
      );
    }
    return metaoption;
  }

  async deleteMetaOption(id: number) {
    const metaoption = await this.metaOptionsRepository.findOne({
      where: { id },
    });
    if (!metaoption) {
      throw new BadRequestException(
        `The metaOption with id: ${id} doesn't exist`,
      );
    }
    await this.metaOptionsRepository.remove(metaoption);
    return {
      delete: 'success',
      id,
    };
  }
}
