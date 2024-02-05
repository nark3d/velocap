import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../../lib/abstract/abstract.service';
import { PaginationService } from '../../lib/services/pagination.service';

@Injectable()
export class ActivityService extends AbstractService<Activity> {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    protected readonly paginationService: PaginationService<Activity>
  ) {
    super(activityRepository, paginationService);
  }
}
