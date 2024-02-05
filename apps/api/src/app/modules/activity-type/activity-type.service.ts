import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityType } from './entities/activity-type.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../../lib/abstract/abstract.service';
import { PaginationService } from '../../lib/services/pagination.service';

@Injectable()
export class ActivityTypeService extends AbstractService<ActivityType> {
  constructor(
    @InjectRepository(ActivityType)
    private readonly activityTypeRepository: Repository<ActivityType>,
    protected readonly paginationService: PaginationService<ActivityType>,
  ) {
    super(activityTypeRepository, paginationService);
  }
}
