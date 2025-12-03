import { IsInt, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreatePostDTO } from './create-post.dto';
import { Type } from 'class-transformer';

export class PatchPostDTO extends PartialType(CreatePostDTO) {
  @ApiProperty({ example: 1, description: 'Enter post id to update' })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
