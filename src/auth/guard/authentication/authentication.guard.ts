import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from 'src/auth/common/constants/auth.constants';
import { EAuthType } from 'src/auth/common/enums/auth.enums';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<EAuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [EAuthType.Bearer];

    const authTypeGuardMap: Record<EAuthType, CanActivate> = {
      [EAuthType.Bearer]: this.accessTokenGuard,
      [EAuthType.None]: { canActivate: () => true },
    };

    const guards = authTypes.map((type) => authTypeGuardMap[type]);

    let error = new UnauthorizedException();

    for (const guard of guards) {
      const isValid = await Promise.resolve(guard.canActivate(context)).catch(
        (err) => {
          // The unauthorized exception from accesstokenGaurd comes here and is thrown
          error = err;
        },
      );

      console.log(isValid);

      if (isValid) {
        return true;
      }
    }

    throw error;
  }
}
