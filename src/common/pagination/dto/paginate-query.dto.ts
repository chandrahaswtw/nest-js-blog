import { IsInt, IsOptional, IsPositive, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginateQueryDTO {
  @ApiProperty({
    required: false,
    example: 1,
    description: 'Enter the page number',
  })
  @IsInt()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({
    required: false,
    example: 1,
    description: 'Enter the page number',
  })
  @IsInt()
  @IsOptional()
  @IsPositive()
  @Max(500)
  @Type(() => Number)
  limit: number = 10;
}
