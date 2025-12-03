import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class createManyUsersDTO {
  @ApiProperty({ type: () => [CreateUserDTO] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDTO)
  users: CreateUserDTO[];
}
