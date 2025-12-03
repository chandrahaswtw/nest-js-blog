import { IsJSON, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMetaOptionDTO {
  @ApiProperty({
    description: 'Provide a JSON value',
    example: '{"name": "Chandrahas"}',
  })
  @IsJSON()
  @IsNotEmpty()
  metaOption: string;
}
