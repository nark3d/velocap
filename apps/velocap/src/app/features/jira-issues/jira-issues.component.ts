import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { JiraIssueService } from '../../shared/services/http/jira-issue.service';
import { catchError,  Subscription, timer } from 'rxjs';

@Component({
  selector: 'velocap-jira-issues',
  templateUrl: './jira-issues.component.html',
  styleUrls: ['./jira-issues.component.scss'],
})
export class JiraIssuesComponent implements OnInit, OnDestroy {
  progress: number | null = null;
  private eventStreamSubscription!: Subscription;
  error: string | null = null;

  private progressSubscription!: Subscription;

  constructor(private jiraIssueService: JiraIssueService, private zone: NgZone) {}

  ngOnInit(): void {
    this.subscribeToProgressUpdates();
  }

  ngOnDestroy(): void {
    this.jiraIssueService.closeConnection();
    this.progressSubscription && this.progressSubscription.unsubscribe();
  }

  subscribeToProgressUpdates(): void {
    console.log('Subscribing to progress updates');
    this.progressSubscription = this.jiraIssueService.subscribeToConnection().pipe(
      catchError(() => {
        console.log('Caught an error in the subscription');
        // If the connection is lost, reconnect after 5 seconds
        timer(5000).subscribe(() => {
          console.log('Attempting to reconnect...');
          this.subscribeToProgressUpdates();
        });
        console.log('Reconnecting to SSE endpoint');
        return timer(0); // emit a value immediately to complete the Observable
      })
    ).subscribe({
      next: (data) => {
        console.log('Received data', data);
        this.zone.run(() => {
          this.progress = data.progress;
        });
      },
      error: (error) => {
        console.error('Error receiving progress updates', error);
      },
      complete: () => {
        console.log('SSE connection closed');
      }
    });
  }

  async refreshIssues() {
    try {
      await this.jiraIssueService.refreshIssues().toPromise();
      this.progress = 0;
      this.subscribeToProgressUpdates();
    } catch (error) {
      console.error('Error triggering issue refresh', error);
    }
  }
}
