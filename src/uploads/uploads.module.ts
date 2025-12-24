import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './providers/uploads.service';
import { Uploads } from './uploads.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService],
  imports: [TypeOrmModule.forFeature([Uploads]), UsersModule],
})
export class UploadsModule {}
