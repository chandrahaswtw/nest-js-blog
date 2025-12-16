import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ACCESS_TOKEN_TTL: parseInt(
    process.env.JWT_ACCESS_TOKEN_TTL ?? '3600',
    10,
  ),
}));
