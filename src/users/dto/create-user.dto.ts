import {
  IsString,
  IsOptional,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    example: 'Mike',
    description: "Provide user's first name",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  firstName: string;

  @ApiProperty({
    example: 'Tyson',
    description: "Provide user's last name",
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(50)
  lastName?: string;

  @ApiProperty({
    example: 'MikeTyson',
    description: "Provide user's email",
  })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  email: string;

  @ApiProperty({
    description: 'Provide password',
  })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, {
    message:
      'Password must contain atleast an uppercase, lowercase, a special charecter and number',
  })
  password: string;
}
