import { Injectable } from '@angular/core';
import { AbstractHttpService } from '../abstractHttp.service';
import { Setting } from '../../../../../../api/src/app/modules/setting/entities/setting.entity';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../modules/alert/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class JiraService  {
  protected constructor(
    protected httpClient: HttpClient,
    private notificationService: NotificationService
  ) { }

  protected readonly APIUrl = 'http://localhost:3000/api/jira';
  testConnection() {
    return this.httpClient.get(`${this.APIUrl}/test`);
  }

}
