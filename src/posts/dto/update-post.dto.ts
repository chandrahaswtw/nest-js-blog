import { IsInt, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDTO } from './create-post.dto';
import { Type } from 'class-transformer';

export class PatchPostDTO extends PartialType(CreatePostDTO) {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
