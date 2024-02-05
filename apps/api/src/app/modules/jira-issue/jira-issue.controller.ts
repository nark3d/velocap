import { Body, Controller, Inject, Param, Patch, Post, Sse } from '@nestjs/common';
import { JiraIssueService } from './jira-issue.service';
import { AbstractController } from '../../lib/abstract/abstract.controller';
import { CreateJiraIssueDto } from './dto/create-jira-issue.dto';
import { UpdateJiraIssueDto } from './dto/update-jira-issue.dto';
import { JiraIssue } from './entities/jira-issue.entity';
import { SettingService } from '../setting/setting.service';
import { Observable } from 'rxjs';
import { ProgressData, ProgressService } from '../../lib/services/sse/progress.service';

@Controller('jira-issue')
export class JiraIssueController extends AbstractController<JiraIssue> {
  constructor(
    private readonly jiraIssueService: JiraIssueService,
    private readonly settings: SettingService,
    @Inject(ProgressService) private progressService: ProgressService,
  ) {
    super(jiraIssueService);
  }

  @Post()
  create(
    @Body() createJiraProjectDto: CreateJiraIssueDto,
  ): Promise<JiraIssue> {
    return super.create(createJiraProjectDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJiraProjectDto: UpdateJiraIssueDto,
  ): Promise<JiraIssue> {
    return super.update(id, updateJiraProjectDto);
  }

  @Post('refresh')
  async refreshIssues() {
    const project = await this.settings.getByKey('jiraProject');
    return await this.jiraIssueService.populate(project.value);
  }

  @Sse('refresh/sse')
  sse(): Observable<ProgressData> {
    console.log('SSE endpoint hit!');
    return this.progressService.createEventStream('progress');
  }
}
