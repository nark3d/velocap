import { Version3Client, Config } from 'jira.js';
import { SettingService } from '../../modules/setting/setting.service';
import { Injectable } from '@nestjs/common';
import { PageProject, SearchResults } from 'jira.js/out/version3/models';
import { AvatarWithDetails } from 'jira.js/src/version2/models/avatarWithDetails';
import { Setting } from '../../modules/setting/entities/setting.entity';

interface JiraSettings {
  jiraUrl: string;
  jiraToken: string;
  jiraEmail: string;
}


@Injectable()
export class JiraClient {
  private client: Version3Client;
  constructor(private settingService: SettingService) {
    this.jiraConfig().then(config => this.client = new Version3Client(config));
  }

  private async jiraConfig(): Promise<Config> {
    const config: JiraSettings  = await this.getConfigSettings();
    return {
      host: config['jiraUrl'],
      authentication: { basic: { apiToken: config['jiraToken'], email: config['jiraEmail'] } },
    }
  }

  private async getConfigSettings(): Promise<JiraSettings> {
    return (await this.settingService.getByKeys(['jiraUrl', 'jiraToken', 'jiraEmail'])).data
      .reduce((map: JiraSettings, setting: Setting) =>
        ({ ...map, [setting.key]: setting.value }), { jiraUrl: '', jiraToken: '', jiraEmail: '' });
  }

  async testConnection() {
    await this.jiraConfig().then(config => this.client = new Version3Client(config));
    return await this.client.myself.getCurrentUser();
  }

  async getProjects(maxResults = 50, startAt = 0): Promise<PageProject> {
    return await this.client.projects.searchProjects({ maxResults, startAt});
  }

  async getProjectsCount(): Promise<number> {
    return (await this.getProjects()).total;
  }

  async getAvatarById(id: number): Promise<AvatarWithDetails> {
    return await this.client.avatars.getAvatarImageByID({ type: 'project', id });
  }

  async getIssuesByProjectKey(projectKey: string, maxResults = 50, startAt = 0): Promise<SearchResults> {
    return await this.client.issueSearch.searchForIssuesUsingJql(
      { jql: `project=${projectKey}`, maxResults, startAt }
    );
  }

  async getIssueCountByProjectKey(projectKey: string): Promise<number> {
    return (await this.getIssuesByProjectKey(projectKey)).total;
  }
}
