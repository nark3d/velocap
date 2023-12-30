import { Module } from '@nestjs/common';
import { JiraController } from './jira.controller';
import { SettingModule } from '../setting/setting.module';
import { JiraClient } from '../../lib/utils/jiraClient';

@Module({
  imports: [SettingModule],
  controllers: [JiraController],
  providers: [JiraClient],
})
export class JiraModule {}
