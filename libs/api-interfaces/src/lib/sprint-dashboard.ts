import {SprintAverageCollection} from './sprint-average-collection';
import {SprintStatisticsDecorated} from './sprint-statistics-decroated';
import {SprintPrediction} from './sprint-prediction';

export interface SprintDashboardInterface {
  averages: SprintAverageCollection,
  stats: SprintStatisticsDecorated[],
  predictions: SprintPrediction
}
