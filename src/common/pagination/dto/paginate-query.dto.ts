import { IsInt, IsOptional, IsPositive, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateQueryDTO {
  @IsInt()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number = 1;

  @IsInt()
  @IsOptional()
  @IsPositive()
  @Max(500)
  @Type(() => Number)
  limit: number = 10;
}
