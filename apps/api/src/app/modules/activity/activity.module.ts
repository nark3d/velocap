import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { PaginationService } from '../../lib/services/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  controllers: [ActivityController],
  providers: [ActivityService, PaginationService],
  exports: [ActivityService],
})
export class ActivityModule {}
