import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JiraProject } from './entities/jira-project.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../../lib/abstract/abstract.service';
import { JiraClient } from '../../lib/utils/jiraClient';

@Injectable()
export class JiraProjectService extends AbstractService<JiraProject> {
  constructor(
    @InjectRepository(JiraProject)
    private readonly jiraProjectRepository: Repository<JiraProject>,
    private jiraClient: JiraClient,
  ) {
    super(jiraProjectRepository);
  }

  populate(): Promise<JiraProject[]> {
    this.jiraClient.getProjects().then(projects => {
      console.log('here come the projects', projects);
    });
    return this.jiraProjectRepository.find();
  }
}
