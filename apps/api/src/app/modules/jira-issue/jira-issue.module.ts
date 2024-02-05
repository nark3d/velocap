import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingModule } from '../setting/setting.module';
import { JiraClient } from '../../lib/utils/jiraClient';
import { JiraIssue } from './entities/jira-issue.entity';
import { JiraIssueController } from './jira-issue.controller';
import { JiraIssueService } from './jira-issue.service';
import { ProgressService } from '../../lib/services/sse/progress.service';
import ChunkGenerator from '../../lib/generators/chunk.generator';
import { BatchUpsertModule } from '../../lib/services/batch-upsert/batch-upsert.modiule';
import { JiraIssueMapper } from './jira-issue.mapper';
import { PaginationService } from '../../lib/services/pagination.service';
import { SSEService } from '../../lib/services/sse.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forFeature([JiraIssue]),
    SettingModule,
    BatchUpsertModule
  ],
  controllers: [JiraIssueController],
  providers: [
    ChunkGenerator,
    EventEmitter2,
    JiraClient,
    JiraIssueService,
    PaginationService,
    SSEService,
    ProgressService,
    JiraIssueMapper,
  ],
})
export class JiraIssueModule {}
