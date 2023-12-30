import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../lib/abstract/abstract.entity';
import { Day } from '../../day/entities/day.entity';

@Entity({ name: 'sprints' })
export class Sprint extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @Column({ name: 'start_points', nullable: true })
  startPoints?: number;

  @Column({ name: 'end_points', nullable: true })
  endPoints?: number;

  @Column({ name: 'completed_points', nullable: true })
  completedPoints?: number;

  @Column({ name: 'start_issues', nullable: true })
  startIssues?: number;

  @Column({ name: 'end_issues', nullable: true })
  endIssues?: number;

  @Column({ name: 'completed_issues', nullable: true })
  completedIssues?: number;

  @Column({ name: 'start_day_id' })
  startDayId: number;

  @Column({ name: 'end_day_id' })
  endDayId: number;

  @ManyToOne(() => Day, { eager: true })
  @JoinColumn({ name: 'start_day_id' })
  startDate: Day;

  @ManyToOne(() => Day, { eager: true })
  @JoinColumn({ name: 'end_day_id' })
  endDate: Day;
}
