import { SprintStatistics } from '../../../../../../libs/api-interfaces/src/lib/sprint-statistics';
import { StatisticsDecorator } from './statistics';

describe('StatisticsDecorator', () => {
  it('should decorate the sprint statistics', () => {
    const queryResult: Partial<SprintStatistics>[] = [
      {
        endPoints: 100,
        endIssues: 10,
        computed: 60
      },
      {
        endPoints: 50,
        endIssues: 5,
        computed: 120
      }
    ];
    const decoratedResult = StatisticsDecorator.decorate(queryResult as SprintStatistics[]);
    expect(decoratedResult).toEqual([
      {
        endPoints: 100,
        endIssues: 10,
        computed: 60,
        pointsPerHour: 100 / (60 / 60),
        issuesPerHour: 10 / (60 / 60)
      },
      {
        endPoints: 50,
        endIssues: 5,
        computed: 120,
        pointsPerHour: 50 / (120 / 60),
        issuesPerHour: 5 / (120 / 60)
      }
    ]);
  });
});
