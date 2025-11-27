import { Module } from '@nestjs/common';
import { MetaoptionsController } from './metaoptions.controller';
import { MetaoptionsService } from './providers/metaoptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metaoptions } from './metaoptions.entity';

@Module({
  controllers: [MetaoptionsController],
  providers: [MetaoptionsService],
  imports: [TypeOrmModule.forFeature([Metaoptions])],
})
export class MetaoptionsModule {}
