import {
  IsEnum,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  ValidateNested,
  IsInt,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { EPostType } from './../enum/post-type.enum';
import { EPostStatus } from './../enum/post-status.enum';
import { CreateMetaOptionDTO } from 'src/metaoptions/dto/create-metaoption.dto';

export class CreatePostDTO {
  @ApiProperty({
    example: 'Post title',
    description: 'Post description',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(512)
  title: string;

  @ApiProperty({
    example: 1,
    description: 'Provide user/author id',
  })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  authorId: number;

  @ApiProperty({
    enum: EPostType,
    description:
      'Provide postType and should be among Post, Page, Story, Series',
  })
  @IsEnum(EPostType, {
    message: 'postType should be among Post, Page, Story, Series',
  })
  @IsNotEmpty()
  postType: EPostType;

  @ApiProperty({
    example: 1,
    description: 'Provide user/author id',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  slug: string;

  @ApiProperty({
    enum: EPostStatus,
    description:
      'Provide statusa and should be among Draft, Scheduled, Review, Published',
  })
  @IsEnum(EPostStatus, {
    message: 'status should be among Draft, Scheduled, Review, Published',
  })
  @IsNotEmpty()
  status: EPostStatus;

  @ApiProperty({
    example: 'Test content',
    description: 'Provide psot content',
  })
  @IsString()
  @MaxLength(1024)
  content: string;

  @ApiProperty({
    type: () => CreateMetaOptionDTO,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMetaOptionDTO)
  metaOption: CreateMetaOptionDTO;

  @ApiProperty({
    type: 'array',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tagIds?: number[];
}
