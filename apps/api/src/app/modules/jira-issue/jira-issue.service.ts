import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JiraIssue } from './entities/jira-issue.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../../lib/abstract/abstract.service';
import { JiraClient } from '../../lib/utils/jiraClient';
import { CreateJiraIssueDto } from './dto/create-jira-issue.dto';
import { Issue } from 'jira.js/out/version3/models';
import { JiraIssueMapper } from './jira-issue.mapper';
import { ProgressData, ProgressService } from '../../lib/services/sse/progress.service';
import ChunkGenerator from '../../lib/generators/chunk.generator';
import { BatchUpsertService } from '../../lib/services/batch-upsert/batch-upsert.service';
import { PaginationService } from '../../lib/services/pagination.service';
import { Page } from '../../lib/services/pagination/page.interface';
@Injectable()
export class JiraIssueService extends AbstractService<JiraIssue> {
  private maxResults = 50;

  constructor(
    @InjectRepository(JiraIssue)
    private readonly jiraIssueRepository: Repository<JiraIssue>,
    protected readonly paginationService: PaginationService<JiraIssue>,
    protected readonly progressService: ProgressService,
    private jiraClient: JiraClient,
    private chunkGenerator: ChunkGenerator,
    private batchUpsertService: BatchUpsertService<JiraIssue, CreateJiraIssueDto>,
    private JiraIssueMapper: JiraIssueMapper
  ) {
    super(jiraIssueRepository, paginationService);
  }

  public async populate(projectKey: string): Promise<Page<JiraIssue>> {
    await this.chunk(projectKey);
    return this.findAll({ order: { jiraKey: 'ASC' } });
  }

  private async chunk(projectKey: string): Promise<void> {
    await this.chunkGenerator.chunk(
      (start: number, maxResults: number) => this.fetchMethod(projectKey, start, maxResults),
      (issues: Issue[]) => this.processMethod(issues),
      await this.jiraClient.getIssueCountByProjectKey(projectKey),
      this.maxResults,
      this.progressService
    );
  }

  private async fetchMethod(projectKey: string, start: number, maxResults: number): Promise<Issue[]> {
    return (await this.jiraClient.getIssuesByProjectKey(projectKey, maxResults, start)).issues;
  }

  private async processMethod(issues: Issue[]): Promise<void> {
    const mappedIssues: Partial<JiraIssue>[] = this.JiraIssueMapper.map(issues);
    await this.batchUpsertService.batchUpsertEntities(
      this.repository,
      mappedIssues,
      'jiraId'
    );
  }
}

