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
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';

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
      load: [appConfig, databaseConfig],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
