import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../lib/abstract/abstract.entity';

@Entity({ name: 'settings' })
export class Setting extends AbstractEntity {
  @Column({ unique: true })
  key!: string;
  @Column()
  value!: string;
}
