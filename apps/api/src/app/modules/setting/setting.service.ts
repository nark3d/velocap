import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../../lib/abstract/abstract.service';

@Injectable()
export class SettingService extends AbstractService<Setting> {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {
    super(settingRepository);
  }

  async getByKey(key: string): Promise<Setting> {
    return this.findOneBy(  { key } , `Setting with key ${key} not found`);
  }

  async upsertByKey(key: string, value: string): Promise<Setting> {
    return this.upsert({ key, value } as Setting, 'key');
  }
}
