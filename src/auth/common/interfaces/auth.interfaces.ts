export interface IRefreshTokenPayload {
  id: number;
}

export interface IAuthTokenPayload {
  id: number;
  username: string;
  email: string;
}

export interface IAuthToken {
  username: string;
  email: string;
  id: number;
  iat?: number;
  exp?: number;
}

export interface IRefreshToken {
  id: number;
  iat?: number;
  exp?: number;
}
