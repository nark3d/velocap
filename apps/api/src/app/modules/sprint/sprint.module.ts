import { Module } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { SprintController } from './sprint.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from './entities/sprint.entity';
import { DayModule } from '../day/day.module';
import { MemberModule } from '../member/member.module';
import { PaginationService } from '../../lib/services/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint]), DayModule, MemberModule],
  controllers: [SprintController],
  providers: [PaginationService, SprintService],
  exports: [SprintService],
})
export class SprintModule {}
