import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../lib/abstract/abstract.entity';

@Entity({ name: 'activity_types' })
export class ActivityType extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  ceremony: boolean;
}
