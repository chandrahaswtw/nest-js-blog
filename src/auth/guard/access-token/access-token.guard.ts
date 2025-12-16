import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { IToken } from 'src/auth/common/interfaces/auth.interfaces';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() satisfies Request;
    const token = this.extractRequestFromHeader(request)?.toString();
    if (!token) {
      throw new UnauthorizedException();
    }
    let payload: IToken;
    try {
      payload = await this.jwtService.verifyAsync<IToken>(token);
    } catch {
      console.log('ERROR');
      throw new UnauthorizedException();
    }

    request['user'] = payload;
    return true;
  }

  private extractRequestFromHeader(request: Request) {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
