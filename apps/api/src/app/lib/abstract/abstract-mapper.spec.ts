import { AbstractMapper } from './abstract-mapper';
import { Issue } from 'jira.js/out/version3/models';
import { CreateJiraIssueDto } from '../../modules/jira-issue/dto/create-jira-issue.dto';

class MockMapper extends AbstractMapper<Issue, CreateJiraIssueDto> {
  protected fieldsToMap(record: Issue): CreateJiraIssueDto {
    return {
      self: record.self,
      jiraId: +record.id,
      jiraUpdated: this.convertToDate(record.fields.updated),
    } as CreateJiraIssueDto
  }
}

const records = [
  {
    fields: {  updated: '2021-01-01T00:00:00.000Z' },
    self: 'https://jira.com',
    id: '123',
  } as Issue,
];

describe('AbstractMapper', () => {
  it('should map an array of records using the fieldsToMap method', () => {

    const result = new MockMapper().map(records);
    expect(result).toEqual([{
      jiraId: 123,
      jiraUpdated: new Date('2021-01-01T00:00:00.000Z'),
      self: 'https://jira.com' }]
    );
  });

  it('should return an empty array when mapping an empty array', () => {
    const records = [];
    const result = new MockMapper().map(records);

    expect(result).toEqual([]);
  });
});
