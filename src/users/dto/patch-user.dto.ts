import { CreateUserDTO } from './create-user.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class PatchUserDTO extends PartialType(CreateUserDTO) {
  @ApiProperty({
    example: 1,
    description: 'Provide user id',
  })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
