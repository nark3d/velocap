import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { AbstractController } from '../../lib/abstract/abstract.controller';
import { Availability } from './entities/availability.entity';
import { DayService } from '../day/day.service';
import { ControllerMutator } from '../../lib/utils/controllerMutator';
import { SprintService } from '../sprint/sprint.service';
import { InsertResult } from 'typeorm';

@Controller('availability')
export class AvailabilityController extends AbstractController<Availability> {
  constructor(
    private readonly availabilityService: AvailabilityService,
    private readonly dayService: DayService,
    private readonly sprintService: SprintService,
  ) {
    super(availabilityService);
  }

  @Post()
  async create(
    @Body() createAvailabilityDto: CreateAvailabilityDto,
  ): Promise<Availability> {
    return super.create(
      await ControllerMutator.addDateId<CreateAvailabilityDto>(
        createAvailabilityDto,
        this.dayService,
        'date',
        'dayId',
      ),
    );
  }

  @Patch('batch')
  async batchUpsert(
    @Body() createAvailabilityDtos: CreateAvailabilityDto[],
  ): Promise<InsertResult> {
    return this.availabilityService.batchUpsert(createAvailabilityDtos);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActivityTypeDto: UpdateAvailabilityDto,
  ): Promise<Availability> {
    return super.update(
      id,
      await ControllerMutator.addDateId<UpdateAvailabilityDto>(
        updateActivityTypeDto,
        this.dayService,
        'date',
        'dayId',
      ),
    );
  }
}
