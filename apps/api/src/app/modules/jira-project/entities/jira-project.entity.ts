import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../lib/abstract/abstract.entity';

@Entity({ name: 'jira_projects' })
export class JiraProject extends AbstractEntity {
  @Column({ unique: true })
  self!: string;

  @Column({unique: true})
  jiraId!: number;

  @Column({unique: true})
  jiraKey!: string;

  @Column()
  name!: string;

  @Column()
  avatarUrl!: string;

  @Column()
  style!: string;
}
