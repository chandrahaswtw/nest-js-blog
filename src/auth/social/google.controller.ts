import { Body, Controller, Post } from '@nestjs/common';
import { GoogleTokenDTO } from './dto/google-token.dto';
import { GoogleProvider } from './providers/google.provider';
import { Authentication } from '../decorators/authentication.decorator';
import { EAuthType } from '../common/enums/auth.enums';

@Controller('auth/google')
export class GoogleController {
  constructor(private readonly googleProvider: GoogleProvider) {}
  @Authentication(EAuthType.None)
  @Post()
  googleAuth(@Body() googleAuthData: GoogleTokenDTO) {
    return this.googleProvider.authenticate(googleAuthData);
  }
}
