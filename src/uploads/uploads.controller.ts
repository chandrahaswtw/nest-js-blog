import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadsService } from './providers/uploads.service';
import { Authentication } from 'src/auth/decorators/authentication.decorator';
import { EAuthType } from 'src/auth/common/enums/auth.enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Authentication(EAuthType.Bearer)
  @UseInterceptors(FileInterceptor('nest-file'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('file')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('id') userId: number,
  ) {
    return await this.uploadsService.uploadedFile(file, userId);
  }
}
