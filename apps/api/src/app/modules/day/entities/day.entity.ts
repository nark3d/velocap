import { Availability } from '../../availability/entities/availability.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../lib/abstract/abstract.entity';

@Entity({ name: 'days' })
export class Day extends AbstractEntity {
  @Index({ unique: true })
  @Column({ type: 'date' })
  date: string;

  @OneToMany(() => Availability, availability => availability.day)
  availability: Availability[];
}
