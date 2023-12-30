import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../lib/abstract/abstract.entity';

@Entity({ name: 'roles' })
export class Role extends AbstractEntity {
  @Column()
  value: string;
}
