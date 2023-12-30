import {SprintAverages} from './sprint-averages';

export type SprintAverageCollection = {
  [sprint in number | "all"]: SprintAverages;
};
