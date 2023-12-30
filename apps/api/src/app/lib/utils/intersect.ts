import { Day } from '../../modules/day/entities/day.entity';
import { Member } from '../../modules/member/entities/member.entity';
import {
  AvailabilityActivity,
  DayMemberAvailabilityInterface,
  DayMembers,
  MemberAvailabilities,
} from '../interfaces/day-member-availability.interface';
import { Availability } from '../../modules/availability/entities/availability.entity';

// @todo - this is a bit long, probably needs abstracting and neatening up
export class Intersect {
  public static dayMemberAvailability(
    days: Day[],
    members: Member[],
  ): DayMemberAvailabilityInterface {
    return {
      days: days.map(day => Intersect.mapMembersToDay(members, day)),
    };
  }

  private static mapMembersToDay(members: Member[], day: Day): DayMembers {
    return {
      ...day,
      members: members.map(member =>
        Intersect.mapAvailabilitiesToMember(day.availability, member),
      ),
    };
  }

  private static mapAvailabilitiesToMember(
    availabilities: Availability[],
    member: Member,
  ): MemberAvailabilities {
    return {
      ...member,
      availability: this.getAvailability(availabilities, member),
    };
  }

  private static getAvailability(
    availabilities: Availability[],
    member: Member,
  ): AvailabilityActivity[] | undefined[] {
    return availabilities
      ? Intersect.sumActivities(
          availabilities.filter(
            availability => availability.memberId === member.id,
          )[0],
        )
      : [];
  }

  private static sumActivities(
    availability: Availability,
  ): AvailabilityActivity[] {
    if (!availability) {
      return [];
    }
    const activitySum = availability.activity.reduce(
      (sum, activity) => sum + activity.minutes,
      0,
    );
    return [
      {
        ...availability,
        activitySum,
        computedAvailability: availability.minutes - activitySum,
      },
    ] as AvailabilityActivity[];
  }
}
