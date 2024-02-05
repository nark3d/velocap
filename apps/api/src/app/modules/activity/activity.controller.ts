import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { AbstractController } from '../../lib/abstract/abstract.controller';
import { Activity } from './entities/activity.entity';
import { InsertResult } from 'typeorm';
import {DeduplicateAndSum} from '../../lib/utils/Array/DeduplicateAndSum';
import { Page } from '../../lib/services/pagination/page.interface';

@Controller('activity')
export class ActivityController extends AbstractController<Activity> {
  constructor(private readonly activityService: ActivityService) {
    super(activityService);
  }

  @Post()
  create(@Body() createActivityDto: CreateActivityDto): Promise<Activity> {
    return super.create(createActivityDto);
  }

  @Patch('batch')
  async batchUpsert(
    @Body() createActivityDtos: CreateActivityDto[],
  ): Promise<InsertResult> {
    return this.activityService.batchUpsert(DeduplicateAndSum.sumDuplicateActivitiesInArray(createActivityDtos));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    return super.update(id, updateActivityDto);
  }

  @Get('availability/:id')
  findByAvailabilityId(
    @Param('id') id: number,
  ): Promise<Page<Activity>> {
    return super.findAll({
      where: { availabilityId: { id } },
      relations: ['activityTypeId', 'availabilityId'],
    });
  }
}
