import { Test, TestingModule } from '@nestjs/testing';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import {AbstractController} from '../../lib/abstract/abstract.controller';
import {CreateActivityDto} from './dto/create-activity.dto';
import {AbstractService} from '../../lib/abstract/abstract.service';
import {DeduplicateAndSum} from '../../lib/utils/Array/DeduplicateAndSum';
describe('ActivityController', () => {
  let controller: ActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [
        ActivityService,
        {
          provide: getRepositoryToken(Activity),
          useValue: {
            save: jest.fn(),
            batchUpsert: jest.fn(),
            upsert: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
            findAndCount: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ActivityController>(ActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the create method of the abstract controller', () => {
    const abstractCreate = jest.spyOn(AbstractController.prototype as any, 'create');
    controller.create({} as CreateActivityDto);
    expect(abstractCreate).toHaveBeenCalled();
  });

  it('should call the batchUpsert method in the service and the Deduplicate utility', async () => {
    const abstractBatchUpsert = jest.spyOn(AbstractService.prototype as any, 'batchUpsert');
    jest.spyOn(DeduplicateAndSum, 'sumDuplicateActivitiesInArray');
    await controller.batchUpsert([]);
    expect(abstractBatchUpsert).toHaveBeenCalled();
    expect(DeduplicateAndSum.sumDuplicateActivitiesInArray).toHaveBeenCalled();
  });

  it('should call the update method of the abstract controller', () => {
    const abstractUpdate = jest.spyOn(AbstractController.prototype as any, 'update');
    controller.update('1', {} as CreateActivityDto);
    expect(abstractUpdate).toHaveBeenCalled();
  });

  it('should call the findAll method of the abstract controller', async () => {
    const abstractFindAll = jest.spyOn(AbstractController.prototype as any, 'findAll').mockReturnValue([['data'], 1]);
    await controller.findByAvailabilityId(1);
    expect(abstractFindAll).toHaveBeenCalled();
  });
});
