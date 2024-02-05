import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Availability } from './entities/availability.entity';
import { In, InsertResult, Repository } from 'typeorm';
import { AbstractService } from '../../lib/abstract/abstract.service';
import { Day } from '../day/entities/day.entity';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { PaginationService } from '../../lib/services/pagination.service';

@Injectable()
export class AvailabilityService extends AbstractService<Availability> {
  constructor(
    @InjectRepository(Availability)
    private readonly availabilityRepository: Repository<Availability>,
    protected readonly paginationService: PaginationService<Availability>,
  ) {
    super(availabilityRepository, paginationService);
  }

  // @todo - make this return all the id's - this isn't good enough
  public async batchUpsert(
    createAvailabilityDtos: CreateAvailabilityDto[],
  ): Promise<InsertResult> {
    return await this.availabilityRepository.upsert(createAvailabilityDtos, [
      'memberId',
      'dayId',
    ]);
  }
}
