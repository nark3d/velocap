import { Activity } from '../../../modules/activity/entities/activity.entity';
import {DeduplicateAndSum} from './DeduplicateAndSum';
import {CreateActivityDto} from '../../../modules/activity/dto/create-activity.dto';

describe('Deduplicate Array and Sum minutes', () => {
  it('should deduplicate and sum minutes', () => {
    const array = [
      { activityTypeId: 2, minutes: 60,availabilityId: 10257 },
      { activityTypeId: 2, minutes: 60,availabilityId: 10257 },
      { activityTypeId: 3, minutes: 60,availabilityId: 10257 },
      { activityTypeId: 4, minutes: 30,availabilityId: 10257 },
    ];

    const deduplicatedArray = DeduplicateAndSum.sumDuplicateActivitiesInArray(array);

    expect(deduplicatedArray).toEqual([
      { activityTypeId: 2, minutes: 120,availabilityId: 10257 },
      { activityTypeId: 3, minutes: 60,availabilityId: 10257 },
      { activityTypeId: 4, minutes: 30,availabilityId: 10257 },
    ]);
  });
});
