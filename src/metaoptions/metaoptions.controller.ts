import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  ParseIntPipe,
  Body,
  Delete,
} from '@nestjs/common';
import { MetaoptionsService } from './providers/metaoptions.service';
import { CreateMetaOptionDTO } from './dto/create-metaoption.dto';
import { ApiParam, ApiOperation } from '@nestjs/swagger';
import { PaginateQueryDTO } from 'src/common/pagination/dto/paginate-query.dto';

@Controller('metaoptions')
export class MetaoptionsController {
  constructor(private readonly metaOptionsService: MetaoptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create meta option' })
  createMetaOption(@Body() createMetaOptionData: CreateMetaOptionDTO) {
    return this.metaOptionsService.createMetaOption(createMetaOptionData);
  }

  @Get()
  @ApiOperation({ summary: 'Get mutiple metaoptions' })
  getMetaOptions(@Query() getMetaoptionsQueryData: PaginateQueryDTO) {
    return this.metaOptionsService.getMetaOptions(getMetaoptionsQueryData);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get meta option by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
    description: 'Enter the id to fetch',
  })
  getMetaOptionsById(@Param('id', ParseIntPipe) id: number) {
    return this.metaOptionsService.getMetaOptionById(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete meta option' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
    description: 'Enter the id to delete',
  })
  deleteMetaOption(@Param('id', ParseIntPipe) id: number) {
    return this.metaOptionsService.deleteMetaOption(id);
  }
}
