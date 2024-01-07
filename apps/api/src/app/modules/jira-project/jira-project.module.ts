import { Module } from '@nestjs/common';
import { JiraProjectService } from './jira-project.service';
import { JiraProjectController } from './jira-project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JiraProject } from './entities/jira-project.entity';
import { JiraClient } from '../../lib/utils/jiraClient';
import { SettingModule } from '../setting/setting.module';
import StorageService from '../../lib/services/storage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JiraProject]),
    SettingModule
  ],
  controllers: [JiraProjectController],
  providers: [JiraProjectService, JiraClient, StorageService],
})
export class JiraProjectModule {}
