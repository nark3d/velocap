import { Day } from '../../modules/day/entities/day.entity';
import { Member } from '../../modules/member/entities/member.entity';
import { Intersect } from './intersect';
import { Availability } from '../../modules/availability/entities/availability.entity';

describe('Intersect', () => {
  let days: Day[];
  let members: Member[];

  beforeEach(() => {
    days = [
      { id: 1, date: new Date(2022, 1, 1).toDateString(), availability: [{
          id: 1,
          memberId: 1,
          minutes: 720,
          activity: [{ minutes: 180 }],
        }]
      },
      { id: 2, date: new Date(2022, 1, 2).toDateString(), availability: [{
          id: 2,
          memberId: 2,
          minutes: 720,
          activity: [{ minutes: 120 }],
        }]
      }
    ] as Day[];
    members = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ] as Member[];
  });

  it('should return day member availability', () => {
    const result = Intersect.dayMemberAvailability(days, members);
    expect(result).toEqual({
      days: [
        {
          availability: [
            {
              activity: [
                {
                  minutes: 180
                }
              ],
              id: 1,
              memberId: 1,
              minutes: 720
            }
          ],
          date: 'Tue Feb 01 2022',
          id: 1,
          members: [
            {
              availability: [
                {
                  activity: [
                    {
                      minutes: 180
                    }
                  ],
                  activitySum: 180,
                  computedAvailability: 540,
                  id: 1,
                  memberId: 1,
                  minutes: 720
                }
              ],
              id: 1,
              name: 'John'
            },
            {
              availability: [],
              id: 2,
              name: 'Jane'
            }
          ]
        },
        {
          availability: [
            {
              activity: [
                {
                  minutes: 120
                }
              ],
              id: 2,
              memberId: 2,
              minutes: 720
            }
          ],
          date: 'Wed Feb 02 2022',
          id: 2,
          members: [
            {
              availability: [],
              id: 1,
              name: 'John'
            },
            {
              availability: [
                {
                  activity: [
                    {
                      minutes: 120
                    }
                  ],
                  activitySum: 120,
                  computedAvailability: 600,
                  id: 2,
                  memberId: 2,
                  minutes: 720
                }
              ],
              id: 2,
              name: 'Jane'
            }
          ]
        }
      ]
    });
  });
});
