import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { AuthService } from './providers/auth.service';
import { Authentication } from './decorators/authentication.decorator';
import { EAuthType } from './common/enums/auth.enums';
import { RefreshTokenDTO } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Authentication(EAuthType.None)
  @Post()
  @HttpCode(HttpStatus.OK)
  signin(@Body() signInData: SignInDTO) {
    return this.authService.signIn(signInData);
  }

  @Authentication(EAuthType.None)
  @Post('/refreshToken')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Body() refreshTokenData: RefreshTokenDTO) {
    return this.authService.refreshToken(refreshTokenData);
  }
}
