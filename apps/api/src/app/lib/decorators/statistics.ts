import {SprintStatistics} from '../../../../../../libs/api-interfaces/src/lib/sprint-statistics';
import {SprintStatisticsDecorated} from '../../../../../../libs/api-interfaces/src/lib/sprint-statistics-decroated';

export class StatisticsDecorator {
  public static decorate(queryResult: SprintStatistics[]): SprintStatisticsDecorated[] {
    return queryResult.map((sprint: SprintStatistics) => ({
      ...sprint,
      pointsPerHour: sprint.endPoints / (sprint.computed / 60),
      issuesPerHour: sprint.endIssues / (sprint.computed / 60),
    }));
  }
}
