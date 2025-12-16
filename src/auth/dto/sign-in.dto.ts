import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
  @ApiProperty({
    example: 'xyz@gmail.com',
    description: 'Enter your email',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'password@123',
    description: 'Enter your password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
