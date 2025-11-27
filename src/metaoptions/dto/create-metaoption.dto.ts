import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreateMetaOptionDTO {
  @IsJSON()
  @IsNotEmpty()
  metaOption: string;
}
