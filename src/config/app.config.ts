import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.NODE_ENV,
  version: process.env.API_VERSION,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET ?? '',
  AWS_REGION: process.env.AWS_REGION ?? '',
  CLOUD_FRONT_URL: process.env.CLOUD_FRONT_URL ?? '',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? '',
  AWS_ACCESS_SECRET: process.env.AWS_ACCESS_SECRET ?? '',
}));
