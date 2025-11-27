import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class PatchUserDTO extends PartialType(CreateUserDTO) {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
