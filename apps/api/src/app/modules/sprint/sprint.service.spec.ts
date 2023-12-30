import { Test, TestingModule } from '@nestjs/testing';
import { SprintService } from './sprint.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sprint } from './entities/sprint.entity';
import { DayService } from '../day/day.service';
import { Day } from '../day/entities/day.entity';
import {AbstractService} from '../../lib/abstract/abstract.service';
import {Repository, SelectQueryBuilder} from 'typeorm';

describe('Sprint Service', () => {
  let service: SprintService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SprintService,
        {
          provide: getRepositoryToken(Sprint),
          useValue: {
            findAndCount: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            createQueryBuilder: jest.fn().mockImplementation(() => ({
              select: jest.fn().mockReturnThis(),
              leftJoinAndSelect: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
            })),
          },
        },
        DayService,
        {
          provide: getRepositoryToken(Day),
          useValue: {
            findAndCount: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SprintService>(SprintService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call the findAll method of the abstract service', () => {
    const abstractFindAll = jest.spyOn(AbstractService.prototype as AbstractService<Sprint>, 'findAll');
    service.findAll();
    expect(abstractFindAll).toHaveBeenCalled();
  });

  it('should call the find method of the repository', async () => {
    const repository = service['repository'] as Repository<Sprint>;
    const findSpy = jest.spyOn(repository, 'find');
    await service.getLastSprint();
    expect(findSpy).toHaveBeenCalled();
  });

  it('should use the query builder when running the statsJoin method', async () => {
    const repository = service['repository'] as Repository<Sprint>;
    const createQueryBuilderSpy = jest.spyOn(repository, 'createQueryBuilder');
    await (service as any).statsJoin();
    expect(createQueryBuilderSpy).toHaveBeenCalledWith('s');
  });

  it('should run statsJoin and return the result, stats() method', async () => {
    const statsJoinSpy = jest.spyOn(service as any, 'statsJoin').mockImplementation(() => ({
      select: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockReturnValue({}),
    }));
    const result = await service.stats();
    expect(statsJoinSpy).toHaveBeenCalled();
    expect(result).toEqual({});
  });

  it('should run statsJoin and return a result, averages() method', async () => {
    const statsJoinSpy = jest.spyOn(service as any, 'statsJoin').mockImplementation(() => ({
      select: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      getRawOne: jest.fn().mockReturnValue(Promise.resolve({
        avgAvailability: 8,
        avgCompletedPoints: 10,
        avgCompletedIssues: 5
      })),
    }));
    const result = await service.averages();
    const expectedResult = {
      avgAvailability: 8,
      avgCompletedIssues: 5,
      avgCompletedPoints: 10,
      avgIssuesPerHour: 37.5,
      avgPointsPerHour: 75,
    };
    expect(statsJoinSpy).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);

    const resultWithSprint = await service.averages(1);
    expect(resultWithSprint).toEqual(expectedResult);
  });

  it('should limit create a query with a limit', async () => {
    const mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
    } as unknown as SelectQueryBuilder<Sprint>;

    const result = await (service as any).limitQuery(mockQueryBuilder, 1);

    expect(result.select).toHaveBeenCalledWith('s.id');
    expect(result.from).toHaveBeenCalledWith(Sprint, 's');
    expect(result.leftJoin).toHaveBeenCalledWith('s.startDate', 'sd');
    expect(result.orderBy).toHaveBeenCalledWith('sd.date', 'DESC');
    expect(result.limit).toHaveBeenCalledWith(1);
  });


  it('should run the innerJoin callback on the limitSprints method', () => {
    const mockQueryBuilder = {
      innerJoin: jest.fn().mockReturnValue('test')
    };

    const limitQuerySpy = jest.spyOn(service as any, 'limitQuery').mockImplementation(() => mockQueryBuilder);

    const result = (service as any).limitSprints(mockQueryBuilder as unknown as SelectQueryBuilder<Sprint>, 1);

    mockQueryBuilder.innerJoin.mock.calls[0][0]();

    expect(limitQuerySpy).toHaveBeenCalled();
    expect(mockQueryBuilder.innerJoin).toHaveBeenCalledWith(expect.any(Function), 't', 's.id = s_id');
    expect(result).toEqual('test');
  });


  it('should run findOne and getDateBetween on days() method', async () => {
    const abstractFindOne = jest.spyOn(AbstractService.prototype as AbstractService<Sprint>, 'findOne')
      .mockImplementation(() => Promise.resolve({ startDate: '2022/01/01', endDate: '2022/01/02'}) as any);
    const dayService = service['dayService'] as DayService;
    const getDateBetweenSpy = jest.spyOn(dayService, 'getDateBetween');
    await service.days(1);
    expect(abstractFindOne).toHaveBeenCalled();
    expect(getDateBetweenSpy).toHaveBeenCalled();
  });

});
