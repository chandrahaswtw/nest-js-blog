import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import { SignInDTO } from '../dto/sign-in.dto';
import { UsersService } from 'src/users/providers/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenProvider } from './token.provider';
import { IAuthTokenPayload } from '../common/interfaces/auth.interfaces';
import { RefreshTokenDTO } from '../dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingProvider: HashingProvider,
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly tokenProvider: TokenProvider,
  ) {}

  async signIn(signInData: SignInDTO) {
    const user = await this.usersService.getUserByEmail(signInData.username);
    if (!user) {
      throw new UnauthorizedException('Invalid unsername or password');
    }
    const isAuth = await this.hashingProvider.comparePassword(
      signInData.password,
      user.password,
    );
    if (!isAuth) {
      throw new UnauthorizedException('Invalid unsername or password');
    }
    const authTokenPayload: IAuthTokenPayload = {
      id: user.id,
      username: user.firstName,
      email: user.email,
    };

    const { authToken, refreshToken } =
      await this.tokenProvider.generateTokens(authTokenPayload);
    return {
      authToken,
      refreshToken,
    };
  }

  async refreshToken(refreshTokenData: RefreshTokenDTO) {
    const { authToken, refreshToken } = await this.tokenProvider.refreshTokens(
      refreshTokenData.refreshToken,
    );
    return {
      authToken,
      refreshToken,
    };
  }
}
