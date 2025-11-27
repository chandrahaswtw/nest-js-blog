import {
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateTagDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(512)
  @IsNotEmpty()
  slug: string;

  @IsString()
  @MaxLength(1024)
  @IsOptional()
  description?: string;

  @IsString()
  @MaxLength(1024)
  schema?: string;

  @IsString()
  @IsUrl()
  @MaxLength(1024)
  imageURL: string;
}
