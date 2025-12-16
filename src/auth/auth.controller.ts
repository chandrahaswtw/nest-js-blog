import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { AuthService } from './providers/auth.service';
import { Authentication } from './decorators/authentication.decorator';
import { EAuthType } from './common/enums/auth.enums';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Authentication(EAuthType.None)
  @Post()
  @HttpCode(HttpStatus.OK)
  signin(@Body() signInData: SignInDTO) {
    return this.authService.signIn(signInData);
  }
}
