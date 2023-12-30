import {SprintPrediction} from '../../../../../../libs/api-interfaces/src/lib/sprint-prediction';
import {Sprint} from '../../modules/sprint/entities/sprint.entity';
import {SprintStatistics} from '../../../../../../libs/api-interfaces/src/lib/sprint-statistics';
import {SprintAverages} from '../../../../../../libs/api-interfaces/src/lib/sprint-averages';
import {SprintAverageCollection} from '../../../../../../libs/api-interfaces/src/lib/sprint-average-collection';
// @todo DRY this out
export class PredictionsDecorator {
  public static decorate(
    lastSprint: Sprint,
    statistics: SprintStatistics[],
    averages: SprintAverageCollection ): SprintPrediction {

    const prediction = {} as SprintPrediction;

    prediction.name = this.isLastSprintComplete(lastSprint) ? '?' : lastSprint.name;

    const lastSprintInStatistics = statistics.find( (sprint: SprintStatistics) => sprint.id === lastSprint.id);

    if (lastSprintInStatistics) {
      prediction.actualAvailability = lastSprintInStatistics.availability;
      prediction.actualActivities = lastSprintInStatistics.activities;
    }

    prediction.predictedAvailability = this.populateAverages(averages, 'avgAvailability');
    prediction.predictedActivities = this.populateAverages(averages, 'avgActivities');
    prediction.predictedIssues = this.populateAverages(averages, 'avgCompletedIssues');
    prediction.predictedPoints = this.populateAverages(averages, 'avgCompletedPoints');

    if (prediction.actualAvailability && prediction.actualActivities) {
      prediction.predictedPoints = Object.keys(averages).map((key: string) =>
        ({
          [key]: (
            (prediction.actualAvailability - prediction.actualActivities) / 60 )
            * averages[key]['avgPointsPerHour']
        })
      );
      prediction.predictedIssues = Object.keys(averages).map((key: string) =>
        ({
          [key]: (
            (prediction.actualAvailability - prediction.actualActivities) / 60 )
            * averages[key]['avgIssuesPerHour']
        })
      );
    }

    if (prediction.actualAvailability && !prediction.actualActivities) {
      prediction.predictedPoints = Object.keys(averages).map((key: string) => {
         return ({
           [key]: (((prediction.actualAvailability - averages[key]['avgActivities']) / 60)
             * averages[key]['avgPointsPerHour'])
          });
        }
      );
      prediction.predictedIssues = Object.keys(averages).map((key: string) => {
        return ({
          [key]: (((prediction.actualAvailability - averages[key]['avgActivities']) / 60)
            * averages[key]['avgIssuesPerHour'])
        });
       }
      );
    }
    return prediction;
  }

  private static populateAverages(
    averages: SprintAverageCollection,
    property: keyof SprintAverages
  ): { [p: number]: number }[] {
    return Object.keys(averages).map((key: string) => ({[key]: averages[key][property]}));
  }

  private static isLastSprintComplete(lastSprint: Sprint): boolean {
    return lastSprint.completedPoints !== undefined  && typeof lastSprint.completedPoints === 'number';
  }
}
