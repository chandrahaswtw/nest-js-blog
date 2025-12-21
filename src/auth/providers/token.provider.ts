import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthTokenPayload,
  IRefreshToken,
  IRefreshTokenPayload,
} from '../common/interfaces/auth.interfaces';
import authConfig from './../config/auth.config';
import type { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class TokenProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,

    @Inject(authConfig.KEY)
    private readonly authEnv: ConfigType<typeof authConfig>,
  ) {}

  async generateTokens(authTokenPayload: IAuthTokenPayload) {
    const refreshTokenPayload: IRefreshTokenPayload = {
      id: authTokenPayload.id,
    };

    const [authToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(authTokenPayload, {
        expiresIn: this.authEnv.JWT_AUTH_TOKEN_TTL,
      }),
      this.jwtService.signAsync(refreshTokenPayload, {
        expiresIn: this.authEnv.JWT_REFRESH_TOKEN_TTL,
      }),
    ]);

    return { authToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    let payload: IRefreshToken;
    try {
      payload = await this.jwtService.verifyAsync<IRefreshToken>(refreshToken);
    } catch {
      throw new UnauthorizedException();
    }

    const { id } = payload;
    const user = await this.usersService.getUserById(id);
    return this.generateTokens({
      id: user.id,
      email: user.email,
      username: user.firstName,
    });
  }
}
