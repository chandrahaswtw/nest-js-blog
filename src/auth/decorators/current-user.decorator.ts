import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IToken } from '../common/interfaces/auth.interfaces';

export const CurrentUser = createParamDecorator(
  (data: keyof IToken, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() satisfies Request;
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
