import {
  IsString,
  IsOptional,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';
export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(50)
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, {
    message:
      'Password must contain atleast an uppercase, lowercase, a special charecter and number',
  })
  password: string;
}
