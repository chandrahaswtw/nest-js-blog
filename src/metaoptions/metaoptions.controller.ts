import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  ParseIntPipe,
  Body,
  DefaultValuePipe,
  Delete,
} from '@nestjs/common';
import { MetaoptionsService } from './providers/metaoptions.service';
import { CreateMetaOptionDTO } from './dto/create-metaoption.dto';
import { NonNegativeIntPipe } from './../utils/pipes/nonNegativePipe';

@Controller('metaoptions')
export class MetaoptionsController {
  constructor(private readonly metaOptionsService: MetaoptionsService) {}
  @Post()
  createMetaOption(@Body() createMetaOptionData: CreateMetaOptionDTO) {
    console.log(createMetaOptionData);
    return this.metaOptionsService.createMetaOption(createMetaOptionData);
  }

  @Get()
  getMetaOptions(
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
    return this.metaOptionsService.getMetaOptions(page, count);
  }

  @Get('/:id')
  getMetaOptionsById(@Param('id', ParseIntPipe) id: number) {
    return this.metaOptionsService.getMetaOptionById(id);
  }

  @Delete('/:id')
  deleteMetaOption(@Param('id', ParseIntPipe) id: number) {
    return this.metaOptionsService.deleteMetaOption(id);
  }
}
