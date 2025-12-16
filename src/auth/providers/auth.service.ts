import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import { SignInDTO } from '../dto/sign-in.dto';
import { UsersService } from 'src/users/providers/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingProvider: HashingProvider,
    private usersService: UsersService,
    private jwtService: JwtService,
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
    const payload = {
      userId: user.id,
      username: user.firstName,
      email: user.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
