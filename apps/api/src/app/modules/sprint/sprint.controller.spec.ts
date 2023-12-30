import { Test, TestingModule } from '@nestjs/testing';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sprint } from './entities/sprint.entity';
import { DayService } from '../day/day.service';
import { Day } from '../day/entities/day.entity';
import {MemberService} from '../member/member.service';
import {Member} from '../member/entities/member.entity';
import { AbstractController } from '../../lib/abstract/abstract.controller';
import {CreateSprintDto} from './dto/create-sprint.dto';
import {DateRange} from '../../lib/utils/dateRange';
import {Intersect} from '../../lib/utils/intersect';
import {DayMemberAvailabilityInterface} from '../../lib/interfaces/day-member-availability.interface';
import {PredictionsDecorator} from '../../lib/decorators/predictions';
import {StatisticsDecorator} from '../../lib/decorators/statistics';
import {SprintStatisticsDecorated} from '../../../../../../libs/api-interfaces/src/lib/sprint-statistics-decroated';

const mockUpsertDateArray = jest.fn().mockReturnValue([]);
jest.mock('../day/day.service', () => ({
  DayService: jest.fn().mockImplementation(() => ({
    upsertDateArray: mockUpsertDateArray,
    upsertFromDateAndGetId: jest.fn().mockReturnValue(1),
  })),
}));

jest.mock('../../lib/decorators/predictions', () => ({
  PredictionsDecorator: {
    decorate: jest.fn().mockReturnValue({})
}}));

describe('RoleController', () => {
  let controller: SprintController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SprintController],
      providers: [
        SprintService,
        {
          provide: getRepositoryToken(Sprint),
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
            find: jest.fn(),
          },
        },
        DayService,
        {
          provide: getRepositoryToken(Day),
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
          },
        },
        MemberService,
        {
          provide: getRepositoryToken(Member),
          useValue: {},
        }
      ],
    }).compile();

    controller = module.get<SprintController>(SprintController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the create method of the abstract controller', async () => {
    const abstractCreate = jest.spyOn(AbstractController.prototype as any, 'create');
    const getDateRange = jest.spyOn(DateRange, 'getDateRange').mockReturnValue([]);
    await controller.create({} as CreateSprintDto);

    expect(mockUpsertDateArray).toHaveBeenCalled();
    expect(getDateRange).toHaveBeenCalled();
    expect(abstractCreate).toHaveBeenCalled();
  });

  it('should call the update method of the abstract controller', async () => {
    const abstractUpdate = jest.spyOn(AbstractController.prototype as any, 'update');
    const getDateRange = jest.spyOn(DateRange, 'getDateRange').mockReturnValue([]);
    await controller.update('1', {} as CreateSprintDto);

    expect(mockUpsertDateArray).toHaveBeenCalled();
    expect(getDateRange).toHaveBeenCalled();
    expect(abstractUpdate).toHaveBeenCalled();
  });

  it('should call the days method of th sprint service', async () => {
    const sprintServiceDays = jest.spyOn(SprintService.prototype as any, 'days').mockReturnValue([]);
    await controller.getDays(1);

    expect(sprintServiceDays).toHaveBeenCalled();
  });

  it('should intersect the results of the member findall method', async () => {
    const memberServiceFindAll = jest.spyOn(MemberService.prototype as any, 'findAll').mockReturnValue([]);
    const dayMemberAvailability = jest.spyOn(Intersect, 'dayMemberAvailability').mockReturnValue({} as DayMemberAvailabilityInterface);
    const sprintServiceDays = jest.spyOn(SprintService.prototype as any, 'days').mockReturnValue(Promise.resolve([]));

    await controller.getFromSprintId(1);

    expect(memberServiceFindAll).toHaveBeenCalled();
    expect(dayMemberAvailability).toHaveBeenCalled();
    expect(sprintServiceDays).toHaveBeenCalled();
  });

  it('should do all the things for the dashboard', async () => {
    const serviceAverages = jest.spyOn(SprintService.prototype as any, 'averages').mockReturnValue([]);
    const serviceStats = jest.spyOn(SprintService.prototype as any, 'stats').mockReturnValue([]);
    const statsDecorator = jest.spyOn(StatisticsDecorator, 'decorate')
      .mockReturnValue({} as SprintStatisticsDecorated[]);
    jest.spyOn(SprintService.prototype as any, 'getLastSprint').mockReturnValue(Promise.resolve([{}] as Sprint[]));

    await controller.getDashboard();

    expect(serviceAverages).toHaveBeenCalledTimes(4);
    expect(serviceStats).toHaveBeenCalled();
    expect(statsDecorator).toHaveBeenCalled();


  });
})
