import { Injectable } from '@angular/core';
import { AbstractHttpService } from '../abstractHttp.service';
import { JiraProject } from '../../../../../../api/src/app/modules/jira-project/entities/jira-project.entity';
import { Observable } from 'rxjs';
import { ResponseInterface } from '../../../../../../api/src/app/lib/interfaces/response.interface';
import { Page } from '../../../../../../api/src/app/lib/services/pagination/page.interface';

@Injectable({
  providedIn: 'root'
})
export class JiraProjectService extends AbstractHttpService<JiraProject> {

  getResourceUrl(): string {
    return '/jira-project';
  }
  getProjects() :Observable<ResponseInterface<JiraProject>> {
    return this.httpClient.get(`${this.APIUrl}`) as Observable<ResponseInterface<JiraProject>>;
  }

  populate(): Observable<Page<JiraProject>> {
    return this.httpClient.get(`${this.APIUrl}/populate`) as Observable<Page<JiraProject>>;
  }
}
