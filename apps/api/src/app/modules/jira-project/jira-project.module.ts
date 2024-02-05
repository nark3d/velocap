import { Module } from '@nestjs/common';
import { JiraProjectService } from './jira-project.service';
import { JiraProjectController } from './jira-project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JiraProject } from './entities/jira-project.entity';
import { JiraClient } from '../../lib/utils/jiraClient';
import { SettingModule } from '../setting/setting.module';
import StorageService from '../../lib/services/storage.service';
import { BatchUpsertModule } from '../../lib/services/batch-upsert/batch-upsert.modiule';
import ChunkGenerator from '../../lib/generators/chunk.generator';
import { JiraProjectMapper } from './jira-project.mapper';
import { PaginationService } from '../../lib/services/pagination.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JiraProject]),
    SettingModule,
    BatchUpsertModule
  ],
  controllers: [JiraProjectController],
  providers: [
    ChunkGenerator,
    JiraClient,
    JiraProjectMapper,
    JiraProjectService,
    PaginationService,
    StorageService
  ],
})
export class JiraProjectModule {}
