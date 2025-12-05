import { IsOptional, IsDate } from 'class-validator';
import { IntersectionType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { PaginateQueryDTO } from 'src/common/pagination/dto/paginate-query.dto';

class GetPostsBaseDTO {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}

export class GetPostsDTO extends IntersectionType(
  GetPostsBaseDTO,
  PaginateQueryDTO,
) {}
