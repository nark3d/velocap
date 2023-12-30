import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ActivityTypeService } from './activity-type.service';
import { CreateActivityTypeDto } from './dto/create-activity-type.dto';
import { UpdateActivityTypeDto } from './dto/update-activity-type.dto';
import { AbstractController } from '../../lib/abstract/abstract.controller';
import { ActivityType } from './entities/activity-type.entity';

@Controller('activity-type')
export class ActivityTypeController extends AbstractController<ActivityType> {
  constructor(private readonly activityTypeService: ActivityTypeService) {
    super(activityTypeService);
  }

  @Post()
  create(
    @Body() createActivityTypeDto: CreateActivityTypeDto,
  ): Promise<ActivityType> {
    return super.create(createActivityTypeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityTypeDto: UpdateActivityTypeDto,
  ): Promise<ActivityType> {
    return super.update(id, updateActivityTypeDto);
  }
}
