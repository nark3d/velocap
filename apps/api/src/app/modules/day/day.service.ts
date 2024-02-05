import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Day } from './entities/day.entity';
import { Between, Repository } from 'typeorm';
import { AbstractService } from '../../lib/abstract/abstract.service';
import { CreateDayDto } from './dto/create-day.dto';
import { PaginationService } from '../../lib/services/pagination.service';

@Injectable()
export class DayService extends AbstractService<Day> {
  constructor(
    @InjectRepository(Day)
    private readonly dayRepository: Repository<Day>,
    protected readonly paginationService: PaginationService<Day>
  ) {
    super(dayRepository, paginationService);
  }

  async upsertFromDateString(date: string): Promise<Day> {
    return this.upsert({ date } as CreateDayDto, 'date');
  }

  async upsertFromDateAndGetId(date: string): Promise<number> {
    return await this.upsertFromDateString(date).then(record => record.id);
  }

  async upsertDateArray(dateArray: string[]): Promise<void> {
    dateArray.map(async record => {
      await this.upsert(Object.assign(new CreateDayDto(), { date: record }), 'date');
    });
  }

  async getDateBetween(startDay: Day, endDay: Day): Promise<[Day[], number]> {
    return this.dayRepository.findAndCount({
      where: { date: Between(startDay.date, endDay.date) },
      relations: [
        'availability',
        'availability.activity',
        'availability.activity.activityTypeId',
      ],
      order: { date: 'ASC' },
    });
  }
}
