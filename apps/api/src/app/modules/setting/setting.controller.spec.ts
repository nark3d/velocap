import { Test, TestingModule } from '@nestjs/testing';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import {CreateSettingDto} from './dto/create-setting.dto';

describe('SettingController', () => {
  let controller: SettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingController],
      providers: [
        SettingService,
        {
          provide: getRepositoryToken(Setting),
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SettingController>(SettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the create method of the service', async () => {
    const createSpy = jest.spyOn(SettingService.prototype, 'create');
    await controller.create({} as CreateSettingDto);
    expect(createSpy).toHaveBeenCalled();
  });

  it('should call the update method of the service', async () => {
    const updateSpy = jest.spyOn(SettingService.prototype, 'update');
    await controller.update('1', {} as CreateSettingDto);
    expect(updateSpy).toHaveBeenCalled();
  });
});
