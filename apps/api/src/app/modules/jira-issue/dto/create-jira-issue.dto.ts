import { AbstractDto } from '../../../lib/abstract/abstract.dto';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateJiraIssueDto extends AbstractDto {
  @IsNotEmpty()
  @IsString()
  self: string;

  @IsNotEmpty()
  @IsNumber()
  jiraId: number;

  @IsNotEmpty()
  @IsString()
  jiraKey: string;

  @IsNotEmpty()
  @IsDate()
  jiraUpdated: Date;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsNotEmpty()
  @IsString()
  issueType: string;

  @IsNumber()
  storyPoints: number;

  @IsNotEmpty()
  @IsString()
  status: string;
}
