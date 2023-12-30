import {CreateActivityDto} from '../../../modules/activity/dto/create-activity.dto';

// @todo this should probably live in the DTO?  I'm not sure that this is the right way to do this anyway...
export class DeduplicateAndSum {
  public static sumDuplicateActivitiesInArray<T extends Partial<CreateActivityDto>>(array: T[]): T[] {
    return [...new Set(DeduplicateAndSum.sanitiseActivities(array))].reduce((activities: T[], curr: T) => {
      const duplicate = activities.find(DeduplicateAndSum.isDuplicate(curr));
      duplicate ? duplicate.minutes += curr.minutes : activities.push(curr);

      return activities;
    }, []);
  }

  private static sanitiseActivities<T extends Partial<CreateActivityDto>>(activities: T[]): T[] {
    return activities.map((activity: T) => {
      activity.minutes = Number(activity.minutes);
      return activity;
    });
  }
  private static isDuplicate<T extends Partial<CreateActivityDto>>(activity: T) {
    return (item: T): boolean => {
      return activity.availabilityId === item.availabilityId && activity.activityTypeId === item.activityTypeId;
    }
  }
}
