import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JiraProject } from './entities/jira-project.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../../lib/abstract/abstract.service';
import { JiraClient } from '../../lib/utils/jiraClient';
import { PageProject } from 'jira.js/out/version3/models';
import { Project } from 'jira.js/out/version3/models';
import { CreateJiraProjectDto } from './dto/create-jira-project.dto';
import StorageService from '../../lib/services/storage.service';
import { Readable } from 'stream';
import { join } from 'path';
import { extension } from 'mime-types';
import { BatchUpsertService } from '../../lib/services/batch-upsert/batch-upsert.service';
import ChunkGenerator from '../../lib/generators/chunk.generator';
import { JiraProjectMapper } from './jira-project.mapper';
import { File } from '../../lib/utils/file';
import { URL } from '../../lib/utils/url';
import { PaginationService } from '../../lib/services/pagination.service';
import { Page } from '../../lib/services/pagination/page.interface';

@Injectable()
export class JiraProjectService extends AbstractService<JiraProject> {
  private maxResults = 50;
  private path = join(__dirname, '../../../dist/public/images/projects');

  constructor(
    @InjectRepository(JiraProject)
    private readonly jiraProjectRepository: Repository<JiraProject>,
    protected readonly paginationService: PaginationService<JiraProject>,
    private jiraClient: JiraClient,
    private storageService: StorageService,
    private chunkGenerator: ChunkGenerator,
    private batchUpsertService: BatchUpsertService<JiraProject, CreateJiraProjectDto>,
    private jiraProjectMapper: JiraProjectMapper
  ) {
    super(jiraProjectRepository, paginationService);
  }

  async populate(): Promise<Page<JiraProject>> {
    await this.chunk();
    return this.findAll({ order: { jiraKey: 'ASC' } });
  }

  private async chunk(): Promise<void> {
    await this.chunkGenerator.chunk(
      (start: number, maxResults: number) => this.fetchMethod(start, maxResults),
      (projects: Project[]) => this.processMethod(projects),
      await this.jiraClient.getProjectsCount(),
      this.maxResults
    );
  }

  private async fetchMethod(start: number, maxResults: number): Promise<Project[]> {
    const projects = (await this.jiraClient.getProjects(maxResults, start))
    await this.downloadAvatar(projects);
    return projects.values;
  }

  private async processMethod(projects: Project[]): Promise<void> {
    const mappedIssues: Partial<JiraProject>[] = this.jiraProjectMapper.map(projects);
    await this.batchUpsertService.batchUpsertEntities(
      this.repository,
      mappedIssues,
      'jiraId'
    );
  }

  // @todo I'm not sure this should live in here...
  private async downloadAvatar(pageProject: PageProject): Promise<void> {
    await Promise.all(pageProject.values.map(async project => {
      const avatar = await this.jiraClient.getAvatarById(+URL.getFinalSegment(project.avatarUrls['48x48']));
      await this.storageService.saveBuffer(avatar.avatar, join(this.path, `${project.id}.${extension(avatar.contentType)}`));
    }));
  }

  async getAvatar(id: number): Promise<{ file: Promise<Readable>; mimeType: string }> {
    const file = await this.storageService.findByBaseName(this.path, `${id}`);
    return {
      file: this.storageService.stream(`${this.path}/${file}`),
      mimeType: File.getMimeType(File.splitPath(file).extension)
    };
  }
}
