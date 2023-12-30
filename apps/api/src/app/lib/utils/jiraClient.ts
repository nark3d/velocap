import { Version3Client } from 'jira.js';
import { SettingService } from '../../modules/setting/setting.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JiraClient {
  private jiraURL: string;
  private jiraToken: string;
  private jiraEmail: string;

  private client: Version3Client;
  constructor(
    private settingService: SettingService
  ) {
  }

  async getCredentials() {
    const settings = await Promise.all([
      this.settingService.getByKey('JiraUrl'),
      this.settingService.getByKey('JiraToken'),
      this.settingService.getByKey('JiraEmail')
    ]);

    this.jiraURL = settings[0].value;
    this.jiraToken = settings[1].value;
    this.jiraEmail = settings[2].value;

    this.client = new Version3Client({
      host: this.jiraURL,
      authentication: {
        basic: {
          apiToken: this.jiraToken,
          email: this.jiraEmail
        },
      },
    });
  }

  async testConnection() {
    await this.getCredentials();
    return await this.client.myself.getCurrentUser();
  }

  async getProjects() {
    await this.getCredentials();
    return await this.client.projects.searchProjects();
  }
}
