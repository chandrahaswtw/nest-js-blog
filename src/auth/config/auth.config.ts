import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_AUTH_TOKEN_TTL: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
  JWT_REFRESH_TOKEN_TTL: parseInt(
    process.env.JWT_REFRESH_TOKEN_TTL ?? '84000',
    10,
  ),
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
}));
