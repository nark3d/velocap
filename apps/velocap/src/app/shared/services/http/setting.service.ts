import { AbstractHttpService } from '../abstractHttp.service';
import { Setting } from '../../../../../../api/src/app/modules/setting/entities/setting.entity';
import { Page } from '../../../../../../api/src/app/lib/services/pagination/page.interface';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService extends AbstractHttpService<Setting> {

  getResourceUrl(): string {
    return '/setting';
  }

  getByKey(key: string): Observable<Setting> {
    return this.httpClient.get<Setting>(`${this.APIUrl}/key/${key}`);
  }

  getByKeys(keys: string[]): Observable<Page<Setting>> {
    return this.httpClient.get<Page<Setting>>(`${this.APIUrl}/keys`, { params: { keys }});
  }

  async updateByKey(key: string, value: string | number): Promise<Setting | undefined> {
    return await lastValueFrom(this.httpClient.put<Setting>(`${this.APIUrl}/key/${key}`, { value }));
  }

  async updateByKeys(settings: ({ key: string; value: string | number })[]): Promise<Setting[] | undefined> {
    return await lastValueFrom(this.httpClient.put<Setting[]>(`${this.APIUrl}/keys`, { settings }));
  }

}
