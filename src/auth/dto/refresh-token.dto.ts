import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDTO {
  @ApiProperty({
    example: 'xyzjgfgfhgf',
    description: 'Enter your refresh token',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
