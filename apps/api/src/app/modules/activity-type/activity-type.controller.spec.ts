import { Test, TestingModule } from '@nestjs/testing';
import { ActivityTypeController } from './activity-type.controller';
import { ActivityTypeService } from './activity-type.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ActivityType } from './entities/activity-type.entity';
import {AbstractController} from '../../lib/abstract/abstract.controller';
import {CreateActivityTypeDto} from './dto/create-activity-type.dto';

describe('Activity Type Controller', () => {
  let controller: ActivityTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityTypeController],
      providers: [
        ActivityTypeService,
        {
          provide: getRepositoryToken(ActivityType),
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ActivityTypeController>(ActivityTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the create method of the abstract controller', () => {
    const abstractCreate = jest.spyOn(AbstractController.prototype as any, 'create');
    controller.create({} as CreateActivityTypeDto);
    expect(abstractCreate).toHaveBeenCalled();
  });

  it('should call the update method of the abstract controller', () => {
    const abstractUpdate = jest.spyOn(AbstractController.prototype as any, 'update');
    controller.update('1', {} as CreateActivityTypeDto);
    expect(abstractUpdate).toHaveBeenCalled();
  });
});
