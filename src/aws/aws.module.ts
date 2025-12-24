import { Global, Module } from '@nestjs/common';
import { AWS_CLIENT } from './common/aws.contants';
import type { ConfigType } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import appConfig from 'src/config/app.config';

@Global()
@Module({
  providers: [
    {
      provide: AWS_CLIENT,
      useFactory: (appEnv: ConfigType<typeof appConfig>) => {
        return new S3Client({
          region: appEnv.AWS_REGION ?? '',
          credentials: {
            accessKeyId: appEnv.AWS_ACCESS_KEY_ID ?? '',
            secretAccessKey: appEnv.AWS_ACCESS_SECRET ?? '',
          },
        });
      },
      inject: [appConfig.KEY],
    },
  ],
  exports: [AWS_CLIENT],
})
export class AwsModule {}
