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
import { ApiParam, ApiQuery, ApiOperation } from '@nestjs/swagger';

@Controller('metaoptions')
export class MetaoptionsController {
  constructor(private readonly metaOptionsService: MetaoptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create meta option' })
  createMetaOption(@Body() createMetaOptionData: CreateMetaOptionDTO) {
    console.log(createMetaOptionData);
    return this.metaOptionsService.createMetaOption(createMetaOptionData);
  }

  @Get()
  @ApiOperation({ summary: 'Get mutiple metaoptions' })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: true,
    example: 1,
    description: 'Enter the page number',
  })
  @ApiQuery({
    name: 'count',
    type: 'number',
    required: true,
    example: 5,
    description: 'Enter the page count',
  })
  getMetaOptions(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('count', new DefaultValuePipe(10), ParseIntPipe)
    count: number,
  ) {
    return this.metaOptionsService.getMetaOptions(page, count);
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
