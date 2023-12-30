import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { AbstractController } from '../../lib/abstract/abstract.controller';
import { Sprint } from './entities/sprint.entity';
import { DayService } from '../day/day.service';
import { Day } from '../day/entities/day.entity';
import { DateRange } from '../../lib/utils/dateRange';
import { ResponseInterface } from '../../lib/interfaces/response.interface';
import { MemberService } from '../member/member.service';
import { Intersect } from '../../lib/utils/intersect';
import {StatisticsDecorator} from '../../lib/decorators/statistics';
import { SprintDashboardInterface } from '../../../../../../libs/api-interfaces/src/lib/sprint-dashboard';
import {SprintAverages} from '../../../../../../libs/api-interfaces/src/lib/sprint-averages';
import {SprintAverageCollection} from '../../../../../../libs/api-interfaces/src/lib/sprint-average-collection';
import {SprintStatisticsDecorated} from '../../../../../../libs/api-interfaces/src/lib/sprint-statistics-decroated';
import {SprintPrediction} from '../../../../../../libs/api-interfaces/src/lib/sprint-prediction';
import {PredictionsDecorator} from '../../lib/decorators/predictions';

@Controller('sprint')
export class SprintController extends AbstractController<Sprint> {
  constructor(
    private readonly sprintService: SprintService,
    private readonly dayService: DayService,
    private readonly memberService: MemberService,
  ) {
    super(sprintService);
  }

  @Post()
  async create(@Body() createSprintDto: CreateSprintDto): Promise<Sprint> {
    await this.dayService.upsertDateArray(
      DateRange.getDateRange(
        createSprintDto.startDate,
        createSprintDto.endDate,
      ),
    );
    return super.create(await this.addDateIds(createSprintDto));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSprintDto: UpdateSprintDto,
  ): Promise<Sprint> {
    await this.dayService.upsertDateArray(
      DateRange.getDateRange(
        updateSprintDto.startDate,
        updateSprintDto.endDate,
      ),
    );
    return super.update(id, await this.addDateIds(updateSprintDto));
  }

  @Get(':id/days')
  async getDays(@Param('id') id: number): Promise<ResponseInterface<Day>> {
    const [data, count] = await this.sprintService.days(id);
    return { data, meta: { count } };
  }

  @Get(':id/availability')
  async getFromSprintId(@Param('id') id: number): Promise<any> {
    const members = await this.memberService.findAll();
    return Intersect.dayMemberAvailability(await this.sprintService.days(id).then(days => days[0]), members[0]);
  }

  @Get('dashboard')
  async getDashboard(): Promise<SprintDashboardInterface> {
    const averages = await this.getAverages();
    const stats = await this.getStatistics();
    const lastSprint = await this.sprintService.getLastSprint();
    return {
      averages: averages,
      stats: stats,
      predictions: PredictionsDecorator.decorate(lastSprint[0], stats, averages),
    };
  }

  @Get('statistics')
  async getStatistics(): Promise<any> {
    return StatisticsDecorator.decorate(await this.sprintService.stats());
  }

  @Get('averages')
  async getAverages(): Promise<SprintAverageCollection> {
    const averages = await Promise.all([
      this.sprintService.averages(),
      this.sprintService.averages(3),
      this.sprintService.averages(6),
      this.sprintService.averages(9),
    ]);
    return {
      all: averages[0],
       3: averages[1],
       6: averages[2],
       9: averages[3],
    };
  }

  // @todo use the utility for this (ControllerMutator) - not DRY
  private async addDateIds(
    createSprintDto: CreateSprintDto,
  ): Promise<CreateSprintDto> {
    return {
      ...createSprintDto,
      ...{
        startDayId: await this.dayService.upsertFromDateAndGetId(
          createSprintDto.startDate,
        ),
      },
      ...{
        endDayId: await this.dayService.upsertFromDateAndGetId(
          createSprintDto.endDate,
        ),
      },
    };
  }
}
