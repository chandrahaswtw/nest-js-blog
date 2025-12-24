import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MetaoptionsModule } from './metaoptions/metaoptions.module';
import { TagsModule } from './tags/tags.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from './common/pagination/pagination.module';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guard/access-token/access-token.guard';
import { AuthenticationGuard } from './auth/guard/authentication/authentication.guard';
import { JwtModule } from '@nestjs/jwt';
import authConfig from './auth/config/auth.config';
import { DataResponseInterceptor } from './common/interceptors/data-response.interceptor';
import { AwsModule } from './aws/aws.module';
import { UploadsModule } from './uploads/uploads.module';

const env = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    MetaoptionsModule,
    TagsModule,
    PostsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: env ? `.env.${env}` : '.env',
      load: [appConfig, databaseConfig, authConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('db.host'),
          port: configService.get('db.port'),
          username: configService.get('db.username'),
          password: configService.get('db.password'),
          database: configService.get('db.database'),
          synchronize: configService.get('db.synchronize'),
          autoLoadEntities: configService.get('db.autoLoadEntities'),
        };
      },
    }),
    PaginationModule,
    AuthModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('auth.JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    AwsModule,
    UploadsModule,
  ],
  controllers: [AppController],

  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
