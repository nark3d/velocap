import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from '../../../lib/abstract/abstract.entity';
import { Member } from '../../member/entities/member.entity';
import { Day } from '../../day/entities/day.entity';
import { Activity } from '../../activity/entities/activity.entity';

@Entity({ name: 'availability' })
@Index(['memberId', 'day'], { unique: true })
export class Availability extends AbstractEntity {
  @Column({ name: 'member_id' })
  @ManyToOne(() => Member, member => member.availability)
  @JoinColumn({ name: 'member_id' })
  memberId: number;

  @ManyToOne(() => Day, day => day.availability)
  day: Day;

  @Column({ name: 'day_id' })
  dayId: number;

  @Column()
  minutes: number;

  @OneToMany(() => Activity, activity => activity.availabilityId)
  activity: Activity[];
}
