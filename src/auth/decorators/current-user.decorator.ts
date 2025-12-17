import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IAuthToken } from '../common/interfaces/auth.interfaces';

export const CurrentUser = createParamDecorator(
  (data: keyof IAuthToken, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() satisfies Request;
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
