import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMetaOptionDTO } from '../dto/create-metaoption.dto';
import { Metaoptions } from './../metaoptions.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/common/pagination/providers/pagination.service';
import { PaginateQueryDTO } from 'src/common/pagination/dto/paginate-query.dto';

@Injectable()
export class MetaoptionsService {
  constructor(
    @InjectRepository(Metaoptions)
    private readonly metaOptionsRepository: Repository<Metaoptions>,
    private readonly paginationService: PaginationService,
  ) {}
  createMetaOption(createMetaOptionData: CreateMetaOptionDTO) {
    const newMetaOption =
      this.metaOptionsRepository.create(createMetaOptionData);
    return this.metaOptionsRepository.save(newMetaOption);
  }

  getMetaOptions(getMetaoptionsQueryData: PaginateQueryDTO) {
    const { limit, page } = getMetaoptionsQueryData;
    return this.paginationService.paginateQuery(
      {
        limit,
        page,
      },
      this.metaOptionsRepository,
    );
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
