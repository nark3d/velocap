import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { DayService } from './day.service';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { AbstractController } from '../../lib/abstract/abstract.controller';
import { Day } from './entities/day.entity';

@Controller('day')
export class DayController extends AbstractController<Day> {
  constructor(private readonly dayService: DayService) {
    super(dayService);
  }

  @Post()
  create(@Body() createDayDto: CreateDayDto): Promise<Day> {
    return super.create(createDayDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDayDto: UpdateDayDto,
  ): Promise<Day> {
    return super.update(id, updateDayDto);
  }
}
