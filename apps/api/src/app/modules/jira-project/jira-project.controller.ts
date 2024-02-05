import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { JiraProjectService } from './jira-project.service';
import { CreateJiraProjectDto } from './dto/create-jira-project.dto';
import { UpdateJiraProjectDto } from './dto/update-jira-project.dto';
import { AbstractController } from '../../lib/abstract/abstract.controller';
import { JiraProject } from './entities/jira-project.entity';
import { Page } from '../../lib/services/pagination/page.interface';

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

  @Get('avatar/:id')
  async getAvatar(@Param('id')id: number, @Res() res: Response) {
    const fileStream = await this.jiraProjectService.getAvatar(id);
    res.set('Content-Type', fileStream.mimeType);
    return (await fileStream.file).pipe(res);
  }

  @Get('populate')
  async populate(): Promise<Page<JiraProject>> {
    return await this.jiraProjectService.populate();
  }
}
