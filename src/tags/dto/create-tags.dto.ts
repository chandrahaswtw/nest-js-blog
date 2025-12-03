import {
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDTO {
  @ApiProperty({
    example: 'Sample tag',
    description: 'Provide tag name',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Sample slug',
    description: 'Provide slug',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(512)
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    example: 'Sample description',
    description: 'Provide tag description',
    required: false,
  })
  @IsString()
  @MaxLength(1024)
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'Sample schema',
    description: 'Provide tag schema',
    required: false,
  })
  @IsString()
  @MaxLength(1024)
  schema?: string;

  @ApiProperty({
    example:
      'https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1679921049/Image_URL_header/Image_URL_header-png?_i=AA',
    description: 'Provide tag URL',
  })
  @IsString()
  @IsUrl()
  @MaxLength(1024)
  imageURL: string;
}
