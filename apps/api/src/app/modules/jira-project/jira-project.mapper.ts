import { AbstractMapper } from '../../lib/abstract/abstract-mapper';
import { Project } from 'jira.js/out/version3/models';
import { JiraProject } from './entities/jira-project.entity';
import { CreateJiraProjectDto } from './dto/create-jira-project.dto';

export class JiraProjectMapper extends AbstractMapper<Project, CreateJiraProjectDto> {
  protected fieldsToMap(project: Project): Partial<JiraProject> {
    return {
      self: project.self,
      jiraId: +project.id,
      jiraKey: project.key,
      name: project.name,
      avatarUrl: `http://localhost:3000/api/jira-project/avatar/${project.id}`,
      style: project.style,
    };
  }
}
