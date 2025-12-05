import { IsOptional, IsDate } from 'class-validator';
import { IntersectionType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginateQueryDTO } from 'src/common/pagination/dto/paginate-query.dto';

class GetPostsBaseDTO {
  @ApiProperty({
    required: false,
    example: '2025-12-05T17:19:28.046Z',
    description: 'Enter start date',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty({
    required: false,
    example: '2025-12-05T17:19:28.046Z',
    description: 'Enter end date',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}

export class GetPostsDTO extends IntersectionType(
  GetPostsBaseDTO,
  PaginateQueryDTO,
) {}
