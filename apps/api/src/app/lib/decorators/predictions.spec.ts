import { Sprint } from '../../modules/sprint/entities/sprint.entity';
import { PredictionsDecorator } from './predictions';
import { SprintAverageCollection } from '../../../../../../libs/api-interfaces/src/lib/sprint-average-collection';
import {SprintPrediction} from '../../../../../../libs/api-interfaces/src/lib/sprint-prediction';
import {SprintStatistics} from '../../../../../../libs/api-interfaces/src/lib/sprint-statistics';

describe('PredictionsDecorator', () => {
  describe('decorate', () => {
    const averages: SprintAverageCollection = {
      3: {
        avgStartPoints: 45.4211,
        avgEndPoints: 65.4436,
        avgCompletedPoints: 18.4962,
        avgStartIssues: 16.4737,
        avgEndIssues: 31.5113,
        avgCompletedIssues: 17.0226,
        avgAvailability: 371.1654,
        avgActivities: 19.2857,
        avgDevTime: 351.8797,
        avgPointsPerHour: 0.04605636856368564,
        avgIssuesPerHour: 0.042386991869918705
      },
      6: {
        avgStartPoints: 39.9831,
        avgEndPoints: 50.4326,
        avgCompletedPoints: 21.1011,
        avgStartIssues: 15.0871,
        avgEndIssues: 24.927,
        avgCompletedIssues: 14.2416,
        avgAvailability: 381.6994,
        avgActivities: 22.4763,
        avgDevTime: 359.2231,
        avgPointsPerHour: 0.04768234129167125,
        avgIssuesPerHour: 0.032181758169215535
      },
      9: {
        avgStartPoints: 40.0,
        avgEndPoints: 50.0,
        avgCompletedPoints: 20.0,
        avgStartIssues: 15.0,
        avgEndIssues: 25.0,
        avgCompletedIssues: 14.0,
        avgAvailability: 380.0,
        avgActivities: 22.0,
        avgDevTime: 358.0,
        avgPointsPerHour: 0.04768234129167125,
        avgIssuesPerHour: 0.032181758169215535
      },
      all: {
        avgStartPoints: 41.8014,
        avgEndPoints: 55.6257,
        avgCompletedPoints: 19.8661,
        avgStartIssues: 15.5193,
        avgEndIssues: 27.1224,
        avgCompletedIssues: 15.1183,
        avgAvailability: 377.6217,
        avgActivities: 21.5873,
        avgDevTime: 356.4423,
        avgPointsPerHour: 0.04768234129167125,
        avgIssuesPerHour: 0.032181758169215535
      },
    };
    const completePredictions: Partial<SprintPrediction> = {
      predictedAvailability: [
        {3: 371.1654},
        {6: 381.6994},
        {9: 380},
        {all: 377.6217},
      ],
      predictedActivities: [
        {3: 19.2857},
        {6: 22.4763},
        {9: 22},
        {all: 21.5873},
      ],
      predictedPoints: [
        {3: 18.4962},
        {6: 21.1011},
        {9: 20},
        {all: 19.8661},
      ],
      predictedIssues: [
        {3: 17.0226},
        {6: 14.2416},
        {9: 14},
        {all: 15.1183},
      ],
    };
    it('returns all fields as predicted if the last sprint is complete', () => {
      expect(
        PredictionsDecorator.decorate(
          {
            name: 'Sprint 1',
            startPoints: 10,
            endPoints: 20,
            completedPoints: 15,
            startIssues: 5,
            endIssues: 10,
            completedIssues: 7,
            startDayId: 1,
            endDayId: 2,
          } as Sprint,
          [],
          averages
        )
      ).toEqual({
        name: '?',
        ...completePredictions,
      });
    });
    it('predicts everything if the last sprint is incomplete and no other fields are set', () => {
      expect(
        PredictionsDecorator.decorate(
          {
            name: 'Sprint 1',
            startDayId: 1,
            endDayId: 2,
          } as Sprint,
          [],
          averages
        )
      ).toEqual({
        name: 'Sprint 1',
        ...completePredictions,
      })
    });
    it('predicts the points if the last sprint has availability set, but no activities', () => {
      expect(
        PredictionsDecorator.decorate(
          {
            id: 1,
            name: 'Sprint 1',
            startDayId: 1,
            endDayId: 2,
          } as Sprint,
          [{id: 1, availability: 27960}] as SprintStatistics[],
          averages
        )
      ).toEqual({
        name: 'Sprint 1',
        actualAvailability: 27960,
        actualActivities: undefined,
        predictedAvailability: [
          {3: 371.1654},
          {6: 381.6994},
          {9: 380},
          {all: 377.6217}
        ],
        predictedActivities: [
          {3: 19.2857},
          {6: 22.4763},
          {9: 22},
          {all: 21.5873},
        ],
        predictedPoints: [
          {3: 21.447463928890695},
          {6: 22.202108998459238},
          {9: 22.202487516778525},
          {all: 22.202815491816043},
        ],
        predictedIssues: [
          {3: 19.738713831230353},
          {6: 14.984643859335462},
          {9: 14.98489932885906},
          {all: 14.985120685719002}
        ],
      })
    });
    it('predicts the points if the last sprint has availability and activities set, but no points', () => {
      expect(
        PredictionsDecorator.decorate(
          {
            id: 1,
            name: 'Sprint 1',
            startDayId: 1,
            endDayId: 2,
          } as Sprint,
          [{id: 1, availability: 27960, activities: 1290}] as SprintStatistics[],
          averages
        )
      ).toEqual({
        name: 'Sprint 1',
        actualAvailability: 27960,
        actualActivities: 1290,
        predictedAvailability: [
          {3: 371.1654},
          {6: 381.6994},
          {9: 380},
          {all: 377.6217}
        ],
        predictedActivities: [
          {3: 19.2857},
          {6: 22.4763},
          {9: 22},
          {all: 21.5873},
        ],
        predictedPoints: [
          {3: 20.472055826558268},
          {6: 21.194800704147873},
          {9: 21.194800704147873},
          {all: 21.194800704147873},
        ],
        predictedIssues: [
          {3: 18.841017886178864},
          {6: 14.304791506216306},
          {9: 14.304791506216306},
          {all: 14.304791506216306}
        ],
      });
    });
  });
});
