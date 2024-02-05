import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../lib/abstract/abstract.entity';

@Entity({ name: 'jira_issues' })
export class JiraIssue extends AbstractEntity {
  @Column({ unique: true })
  self!: string;

  @Column({ unique: true })
  jiraId!: number;

  @Column({ unique: true })
  jiraKey!: string;

  @Column({ nullable: true })
  jiraUpdated!: Date;

  @Column()
  summary!: string;

  @Column()
  issueType!: string;

  @Column({ nullable: true })
  storyPoints!: number;

  @Column()
  status!: string;
}
