import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JiraIssue } from '../../../../../../api/src/app/modules/jira-issue/entities/jira-issue.entity';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { JiraIssueService } from '../../../shared/services/http/jira-issue.service';
import { lastValueFrom } from 'rxjs';
import { Page } from '../../../../../../api/src/app/lib/services/pagination/page.interface';
@Component({
  selector: 'velocap-issues-table',
  templateUrl: './issues-table.component.html',
  styleUrl: './issues-table.component.scss',
})
export class IssuesTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'summary', 'type', 'status', 'storyPoints', 'jiraUpdated']
  dataSource: MatTableDataSource<JiraIssue> = new MatTableDataSource<JiraIssue>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private jiraIssueService: JiraIssueService) {}

  async ngOnInit() {
    if (this.paginator) {
      await this.loadIssues(this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize);
    }
  }

  async ngAfterViewInit() {
    await this.loadIssues(this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize);
    this.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.loadIssues(pageEvent.pageSize, pageEvent.pageIndex * pageEvent.pageSize);
    });
  }

  async loadIssues(take: number, skip: number) {
    const page$ = this.jiraIssueService.getIssues(take, skip);
    const page: Page<JiraIssue> = await lastValueFrom(page$);
    this.dataSource.data = page.data;
    this.paginator.length = page.meta.count;
  }
}
