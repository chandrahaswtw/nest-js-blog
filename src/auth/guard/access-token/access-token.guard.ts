import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { IAuthToken } from 'src/auth/common/interfaces/auth.interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() satisfies Request;
    const token = this.extractRequestFromHeader(request)?.toString();
    if (!token) {
      throw new UnauthorizedException();
    }
    let payload: IAuthToken;
    try {
      payload = await this.jwtService.verifyAsync<IAuthToken>(token);
    } catch {
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
