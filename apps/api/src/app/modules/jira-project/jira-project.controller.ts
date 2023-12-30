import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { JiraProjectService } from './jira-project.service';
import { CreateJiraProjectDto } from './dto/create-jira-project.dto';
import { UpdateJiraProjectDto } from './dto/update-jira-project.dto';
import { AbstractController } from '../../lib/abstract/abstract.controller';
import { JiraProject } from './entities/jira-project.entity';

@Controller('jira-project')
export class JiraProjectController extends AbstractController<JiraProject> {
  constructor(private readonly jiraProjectService: JiraProjectService) {
    super(jiraProjectService);
  }

  @Post()
  create(
    @Body() createJiraProjectDto: CreateJiraProjectDto,
  ): Promise<JiraProject> {
    return super.create(createJiraProjectDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJiraProjectDto: UpdateJiraProjectDto,
  ): Promise<JiraProject> {
    return super.update(id, updateJiraProjectDto);
  }

  @Get('populate')
  populate(): Promise<JiraProject[]> {
    return this.jiraProjectService.populate();
  }
}
