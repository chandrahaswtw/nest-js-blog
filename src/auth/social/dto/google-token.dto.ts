import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleTokenDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
}
