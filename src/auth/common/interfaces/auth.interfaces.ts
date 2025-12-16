export interface IToken {
  username: string;
  email: string;
  userId: number;
  iat?: number;
  exp?: number;
}
