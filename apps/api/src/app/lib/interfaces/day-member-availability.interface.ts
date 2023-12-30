import { Day } from '../../modules/day/entities/day.entity';
import { Member } from '../../modules/member/entities/member.entity';
import { Availability } from '../../modules/availability/entities/availability.entity';

export interface DayMemberAvailabilityInterface {
  days: DayMembers[];
}

export interface DayMembers extends Partial<Day> {
  members: MemberAvailabilities[];
}

export interface MemberAvailabilities extends Partial<Member> {
  availability: AvailabilityActivity[];
}

export interface AvailabilityActivity extends Availability {
  activitySum: number;
  computedAvailability: number;
}
