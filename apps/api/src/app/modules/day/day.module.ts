import { Module } from '@nestjs/common';
import { DayService } from './day.service';
import { DayController } from './day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from './entities/day.entity';
import { PaginationService } from '../../lib/services/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([Day])],
  controllers: [DayController],
  providers: [DayService, PaginationService],
  exports: [DayService],
})
export class DayModule {}
