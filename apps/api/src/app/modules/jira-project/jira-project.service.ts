import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JiraProject } from './entities/jira-project.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AbstractService } from '../../lib/abstract/abstract.service';
import { JiraClient } from '../../lib/utils/jiraClient';
import { PageProject } from 'jira.js/out/version3/models';
import { Project } from 'jira.js/out/version3/models';
import { CreateJiraProjectDto } from './dto/create-jira-project.dto';
import StorageService from '../../lib/services/storage.service';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { Readable } from 'stream';
import { join } from 'path';
import { extension } from 'mime-types';

@Injectable()
export class JiraProjectService extends AbstractService<JiraProject> {
  constructor(
    @InjectRepository(JiraProject)
    private readonly jiraProjectRepository: Repository<JiraProject>,
    private jiraClient: JiraClient,
    private storageService: StorageService,
  ) {
    super(jiraProjectRepository);
  }

  // @todo this is nasty, refactor this
  async getAvatar(id: number): Promise<{ file: Promise<Readable>; mimeType: string }> {
    const avatarPath = join(__dirname, '/public/images/projects');
    const svgPath = join(avatarPath, `${id}.svg`);
    const pngPath = join(avatarPath, `${id}.png`);

    if (existsSync(svgPath)) {
      return {
        file: this.storageService.stream(svgPath),
        mimeType: 'image/svg+xml',
      };
    }

    if (existsSync(pngPath)) {
      return {
        file: this.storageService.stream(pngPath),
        mimeType: 'image/png',
      };
    }

    throw new Error('fuck');
  }

  async populate(): Promise<[JiraProject[], number]> {
    const pageProject: PageProject = await this.jiraClient.getPageProject();
    await this.downloadAvatar(pageProject);
    await this.batchUpsertProject(this.mapProjects(pageProject.values));
    return this.findAll({ order: { jiraKey: 'ASC' } });
  }

  // @todo abstract all of shit shite out of here, just a prototype
  private async downloadAvatar(pageProject: PageProject): Promise<void> {
    const projects = pageProject.values;
    const promises = projects.map(async project => {
      const avatarID = +new URL(project.avatarUrls['48x48']).pathname.split('/').pop();
      const avatar = await this.jiraClient.getAvatarById(avatarID);
      const avatarPath = join(__dirname, '/public/images/projects');
      if (!existsSync(avatarPath)) {
        mkdirSync(avatarPath, { recursive: true });
      }
      const avatarFile = join(avatarPath, `${project.id}.${extension(avatar.contentType)}`);
      await this.saveAvatar(avatar.avatar, avatarFile)
    });
    await Promise.all(promises);
  }

  private async saveAvatar(buffer: ArrayBuffer, avatarPath: string): Promise<void> {
    const tempFilePath = join(__dirname, '../../tmp')
    const tempFile = join(tempFilePath, Date.now().toString());

    if (!existsSync(tempFilePath)) {
      mkdirSync(tempFilePath, { recursive: true });
    }
    writeFileSync(tempFile, Buffer.from(buffer));
    await this.storageService.put(tempFile, avatarPath);
  }

  // @todo nasty, this should be done in the database with ON CONFLICT, but I couldn't get it to work
  private async batchUpsertProject(createDtos: CreateJiraProjectDto[]): Promise<JiraProject[]> {
    return Promise.all(createDtos.map(async dto => {
      const existingEntity = await this.repository.findOneBy(
        { jiraId: dto.jiraId } as FindOptionsWhere<JiraProject>
      );

      return await this.repository.save(existingEntity ?
          this.repository.merge(existingEntity, dto) : this.repository.create(dto as JiraProject)
      );
    }));
  }
  mapProjects(projects: Project[]): JiraProject[] {
    return projects.map(project=> {
      return {
        self: project.self,
        jiraId: project.id,
        jiraKey: project.key,
        name: project.name,
        avatarUrl: `http://localhost:3000/api/jira-project/avatar/${project.id}`,
        style: project.style,
      } as unknown as JiraProject
    })
  }
}
