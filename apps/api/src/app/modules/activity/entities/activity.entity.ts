import {Column, Entity, Index, JoinColumn, ManyToOne} from 'typeorm';
import { AbstractEntity } from '../../../lib/abstract/abstract.entity';
import { Availability } from '../../availability/entities/availability.entity';
import { ActivityType } from '../../activity-type/entities/activity-type.entity';

@Entity({ name: 'activities' })
@Index(['availabilityId', 'activityTypeId'], { unique: true })
export class Activity extends AbstractEntity {
  @ManyToOne(() => Availability)
  @JoinColumn({ name: 'availability_id' })
  availabilityId: Availability;

  @ManyToOne(() => ActivityType)
  @JoinColumn({ name: 'activity_type_id' })
  activityTypeId: ActivityType;

  @Column()
  minutes: number;
}
