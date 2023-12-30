export interface SprintPrediction {
  name: string;
  predictedAvailability:  (Record<number, number> | { all: number })[];
  actualAvailability?: number;
  predictedActivities: (Record<number, number> | { all: number })[];
  actualActivities?: number;
  predictedIssues: (Record<number, number> | { all: number })[];
  predictedPoints:(Record<number, number> | { all: number })[];
}
