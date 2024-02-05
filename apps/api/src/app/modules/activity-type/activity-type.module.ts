import { Module } from '@nestjs/common';
import { ActivityTypeService } from './activity-type.service';
import { ActivityTypeController } from './activity-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityType } from './entities/activity-type.entity';
import { PaginationService } from '../../lib/services/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityType])],
  controllers: [ActivityTypeController],
  providers: [ActivityTypeService, PaginationService],
})
export class ActivityTypeModule {}
