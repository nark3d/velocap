import { Test, TestingModule } from '@nestjs/testing';
import { DayController } from './day.controller';
import { DayService } from './day.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Day } from './entities/day.entity';
import {CreateDayDto} from './dto/create-day.dto';

describe('DayController', () => {
  let controller: DayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayController],
      providers: [
        DayService,
        {
          provide: getRepositoryToken(Day),
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DayController>(DayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the create method of the service', async () => {
    const createSpy = jest.spyOn(DayService.prototype, 'create');
    await controller.create({} as CreateDayDto);
    expect(createSpy).toHaveBeenCalled();
  });

  it('should call the update method of the service', async () => {
    const updateSpy = jest.spyOn(DayService.prototype, 'update');
    await controller.update('1', {} as CreateDayDto);
    expect(updateSpy).toHaveBeenCalled();
  });
});
