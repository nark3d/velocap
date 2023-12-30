import {Test, TestingModule} from '@nestjs/testing';
import {ControllerMutator} from '../../lib/utils/controllerMutator';
import {AvailabilityService} from './availability.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Availability} from './entities/availability.entity';
import {DayService} from '../day/day.service';
import {Day} from '../day/entities/day.entity';
import {SprintService} from '../sprint/sprint.service';
import {Sprint} from '../sprint/entities/sprint.entity';
import {CreateAvailabilityDto} from './dto/create-availability.dto';
import {AvailabilityController} from './availability.controller';
import {AbstractController} from '../../lib/abstract/abstract.controller';


describe('AvailabilityController', () => {

  let controller: AvailabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailabilityController],
      providers: [
        AvailabilityService,
        {
          provide: getRepositoryToken(Availability),
          useValue: {
            save: jest.fn(),
            upsert: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        DayService,
        {
          provide: getRepositoryToken(Day),
          useValue: {},
        },
        SprintService,
        {
          provide: getRepositoryToken(Sprint),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AvailabilityController>(AvailabilityController);
  });

  it('should manipulate the dates and run the create method of the abstract controller', async () => {
    const dateAddSpy = jest.spyOn(ControllerMutator, 'addDateId').mockReturnValue(Promise.resolve({} as CreateAvailabilityDto));
    const abstractCreate = jest.spyOn(AbstractController.prototype as any, 'create');
    await controller.create({} as CreateAvailabilityDto);
    expect(dateAddSpy).toHaveBeenCalled();
    expect(abstractCreate).toHaveBeenCalled();
  });

  it('should call the batchUpsert method of the service', async () => {
    const upsertSpy = jest.spyOn(AvailabilityService.prototype, 'batchUpsert');
    await controller.batchUpsert([]);
    expect(upsertSpy).toHaveBeenCalled();
  });

  it('should get the date id and run the update method of the abstract controller', async () => {
    const dateAddSpy = jest.spyOn(ControllerMutator, 'addDateId').mockReturnValue(Promise.resolve({} as CreateAvailabilityDto));
    const abstractUpdate = jest.spyOn(AbstractController.prototype as any, 'update');
    await controller.update('1', {} as CreateAvailabilityDto);
    expect(dateAddSpy).toHaveBeenCalled();
    expect(abstractUpdate).toHaveBeenCalled();
  });
});
