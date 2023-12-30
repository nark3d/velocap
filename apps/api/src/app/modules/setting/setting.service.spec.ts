import { Test, TestingModule } from '@nestjs/testing';
import { SettingService } from './setting.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import {CreateSettingDto} from './dto/create-setting.dto';
import {Repository} from 'typeorm';

describe('DayService', () => {
  let service: SettingService;
  let repository: Repository<Setting>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingService,
        {
          provide: getRepositoryToken(Setting),
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
            findAndCount: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SettingService>(SettingService);
    repository = module.get<Repository<Setting>>(getRepositoryToken(Setting));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call the findOneBy method of the repository on upsert', () => {
    const findOneBy = jest.spyOn(repository, 'findOneBy');
    service.upsert({} as CreateSettingDto);
    expect(findOneBy).toHaveBeenCalled();
  });




});
