import { Test, TestingModule } from '@nestjs/testing';
import { ActivityTypeService } from './activity-type.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ActivityType } from './entities/activity-type.entity';

describe('ActivityService', () => {
  let service: ActivityTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityTypeService,
        {
          provide: getRepositoryToken(ActivityType),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ActivityTypeService>(ActivityTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
