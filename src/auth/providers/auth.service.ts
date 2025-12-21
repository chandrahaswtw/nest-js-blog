import {
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import { SignInDTO } from '../dto/sign-in.dto';
import { UsersService } from 'src/users/providers/users.service';
import { TokenProvider } from './token.provider';
import { IAuthTokenPayload } from '../common/interfaces/auth.interfaces';
import { RefreshTokenDTO } from '../dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingProvider: HashingProvider,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private readonly tokenProvider: TokenProvider,
  ) {}

  async signIn(signInData: SignInDTO) {
    const user = await this.usersService.getUserByEmail(signInData.username);
    if (!user) {
      throw new UnauthorizedException('Invalid unsername or password');
    }

    // If user registered with google tries to login, it should throw error as password doesn't exist.
    if (user.googleId || !user.password) {
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
