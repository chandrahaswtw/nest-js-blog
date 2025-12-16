import { SetMetadata } from '@nestjs/common';
import { EAuthType } from '../common/enums/auth.enums';
import { AUTH_TYPE_KEY } from '../common/constants/auth.constants';

export const Authentication = (...args: EAuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, args);
