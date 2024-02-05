import { AbstractMapper } from '../../lib/abstract/abstract-mapper';
import { Issue } from 'jira.js/out/version3/models';
import { JiraIssue } from './entities/jira-issue.entity';
import { CreateJiraIssueDto } from './dto/create-jira-issue.dto';

export class JiraIssueMapper extends AbstractMapper<Issue, CreateJiraIssueDto> {
  protected fieldsToMap(issue: Issue): Partial<JiraIssue> {
    return {
      self: issue.self,
      jiraId: +issue.id,
      jiraKey: issue.key,
      jiraUpdated: this.convertToDate(issue.fields.updated),
      summary: issue.fields.summary,
      issueType: issue.fields.issuetype.name,
      storyPoints: issue.fields.customfield_10014,
      status: issue.fields.status.name,
    };
  }
}
