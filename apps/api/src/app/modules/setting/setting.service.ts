import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { In, Repository } from 'typeorm';
import { AbstractService } from '../../lib/abstract/abstract.service';
import { PaginationService } from '../../lib/services/pagination.service';
import { Page } from '../../lib/services/pagination/page.interface';

@Injectable()
export class SettingService extends AbstractService<Setting> {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
    protected readonly paginationService: PaginationService<Setting>,
  ) {
    super(settingRepository, paginationService);
  }

  async getByKey(key: string): Promise<Setting> {
    return this.findOneBy(  { key } , `Setting with key ${key} not found`);
  }

  async getByKeys(keys: string[]): Promise<Page<Setting>> {
    return this.findAll({
      where: { key: In(keys) },
      order: { key: 'ASC' },
    });
  }

  async upsertByKey(key: string, value: string): Promise<Setting> {
    return this.upsert({ key, value } as Setting, 'key');
  }

  async upsertByKeys(settings: Setting[]): Promise<Setting[]> {
    return Promise.all(settings.map(setting => this.upsertByKey(setting.key, setting.value)));
  }
}
