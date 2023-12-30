import { Controller, Get } from '@nestjs/common';
import { JiraClient } from '../../lib/utils/jiraClient';

@Controller('jira')
export class JiraController {

  constructor(private jiraClient: JiraClient) {}

  @Get('test')
  async testConnection() {
    return await this.jiraClient.testConnection();
  }
}
