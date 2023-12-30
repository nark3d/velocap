import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../lib/abstract/abstract.entity';
import { Role } from '../../role/entities/role.entity';
import { Availability } from '../../availability/entities/availability.entity';

@Entity({ name: 'members' })
export class Member extends AbstractEntity {
  @Column()
  name: string;

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'role_id' })
  roleId: Role;

  @OneToMany(() => Availability, availability => availability.memberId)
  availability: Availability[];
}
