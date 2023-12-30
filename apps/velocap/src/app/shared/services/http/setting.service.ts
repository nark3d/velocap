import { AbstractHttpService } from '../abstractHttp.service';
import { Setting } from '../../../../../../api/src/app/modules/setting/entities/setting.entity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService extends AbstractHttpService<Setting> {

  getResourceUrl(): string {
    return '/setting';
  }

  getByKey(key: string) {
    return this.httpClient.get<Setting>(`${this.APIUrl}/key/${key}`);
  }

  async updateByKey(key: string, value: string): Promise<Setting> {
    const response = await this.httpClient.put<Setting>(`${this.APIUrl}/key/${key}`, { value }).toPromise();

    if (!response) {
      throw new Error('No response from updateByKey');
    }

    return response;
  }
}
