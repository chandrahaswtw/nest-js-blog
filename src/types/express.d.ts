import { IToken } from 'src/auth/common/interfaces/auth.interfaces';

declare global {
  namespace Express {
    interface Request {
      user?: IToken;
    }
  }
}

export {};
