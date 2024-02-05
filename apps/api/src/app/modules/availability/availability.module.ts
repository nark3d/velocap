import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Availability } from './entities/availability.entity';
import { DayModule } from '../day/day.module';
import { SprintModule } from '../sprint/sprint.module';
import { PaginationService } from '../../lib/services/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([Availability]), DayModule, SprintModule],
  controllers: [AvailabilityController],
  providers: [AvailabilityService, PaginationService],
  exports: [AvailabilityService],
})
export class AvailabilityModule {}
