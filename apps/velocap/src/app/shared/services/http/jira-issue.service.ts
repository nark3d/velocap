import { Injectable, NgZone } from '@angular/core';
import { JiraIssue } from '../../../../../../api/src/app/modules/jira-issue/entities/jira-issue.entity';
import { AbstractHttpService } from '../abstractHttp.service';
import { Observable, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../modules/alert/services/notification.service';
import { Page } from '../../../../../../api/src/app/lib/services/pagination/page.interface';
import { SseService } from '../sse.service';

@Injectable({
  providedIn: 'root'
})
export class JiraIssueService extends AbstractHttpService<JiraIssue> {
  private eventSource: EventSource | null = null;

  constructor(
    httpClient: HttpClient,
    notificationService: NotificationService,
    private sseService: SseService,
    private zone: NgZone
  ) {
    super(httpClient, notificationService);
  }

  getResourceUrl(): string {
    return '/jira-issue';
  }

  subscribeToConnection(): Observable<any> {
    // Close the existing SSE connection
    this.closeConnection();

    // Open a new SSE connection
    this.sseService.openConnection(`${this.APIUrl}/refresh/sse`);
    return this.sseService.listen();
  }

  closeConnection(): void {
    this.sseService.closeConnection();
  }

  refreshIssues(): Observable<any> {
    return this.httpClient.post(`${this.APIUrl}/refresh`, {});
  }

  getIssues(take: number, skip: number): Observable<Page<JiraIssue>> {
    return this.httpClient.get<Page<JiraIssue>>(`${this.APIUrl}?take=${take}&skip=${skip}`);
  }
}
