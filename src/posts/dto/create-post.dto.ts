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
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

import { EPostType } from './../enum/post-type.enum';
import { EPostStatus } from './../enum/post-status.enum';
import { CreateMetaOptionDTO } from 'src/metaoptions/dto/create-metaoption.dto';

export class CreatePostDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(512)
  title: string;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  authorId: number;

  @IsEnum(EPostType, {
    message: 'postType should be among Post, Page, Story, Series',
  })
  @IsNotEmpty()
  postType: EPostType;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  slug: string;

  @IsEnum(EPostStatus, {
    message: 'status should be among Draft, Scheduled, Review, Published',
  })
  @IsNotEmpty()
  status: EPostStatus;

  @IsString()
  @MaxLength(1024)
  content: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMetaOptionDTO)
  metaOption: CreateMetaOptionDTO;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tagIds?: number[];
}
