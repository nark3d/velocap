import { Test, TestingModule } from '@nestjs/testing';
import { DayService } from './day.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Day } from './entities/day.entity';
import {CreateDayDto} from './dto/create-day.dto';
import {Repository} from 'typeorm';

describe('DayService', () => {
  let service: DayService;
  let repository: Repository<Day>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DayService,
        {
          provide: getRepositoryToken(Day),
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
            findAndCount: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DayService>(DayService);
    repository = module.get<Repository<Day>>(getRepositoryToken(Day));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call the upsert method of the service on upsertfromdatestring', () => {
    const upsert = jest.spyOn(service as any, 'upsert');
    service.upsertFromDateString('2020-01-01');
    expect(upsert).toHaveBeenCalled();
  });

  it ('should call the upserFromDateAndGetId method on upsertFromDateAndGetId', () => {
    const upsertFromDateString = jest.spyOn(service, 'upsertFromDateString').
    mockReturnValue(Promise.resolve({id: 1} as Day));
    service.upsertFromDateAndGetId('2020-01-01');
    expect(upsertFromDateString).toHaveBeenCalled();
  });

  it('should call the findOneBy method of the repository on upsert', () => {
    const findOneBy = jest.spyOn(repository, 'findOneBy');
    service.upsert({} as CreateDayDto);
    expect(findOneBy).toHaveBeenCalled();
  });

  it('should call the upsert method of the service on upsertDateArray', () => {
    const upsert = jest.spyOn(service as any, 'upsert');
    service.upsertDateArray(['2020-01-01']);
    expect(upsert).toHaveBeenCalled();
  });

  it('should call findAndCount on the repository on getDateBetween', () => {
    const findAndCount = jest.spyOn(repository, 'findAndCount');
    service.getDateBetween({ date: '2020-01-01'} as Day, {date: '2020-01-02'} as Day);
    expect(findAndCount).toHaveBeenCalled();
  });
});
