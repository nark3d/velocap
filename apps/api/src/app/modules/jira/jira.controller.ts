import { Controller, Get, Post } from '@nestjs/common';
import { JiraClient } from '../../lib/utils/jiraClient';
import { SettingService } from '../setting/setting.service';

@Controller('jira')
export class JiraController {

  constructor(
    private jiraClient: JiraClient,
    private settings: SettingService
  ) {}

  @Get('test')
  async testConnection() {
    return await this.jiraClient.testConnection();
  }
}
