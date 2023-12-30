import {SprintStatistics} from './sprint-statistics';

export interface SprintStatisticsDecorated extends SprintStatistics {
  pointsPerHour: number;
  issuesPerHour: number;
}
