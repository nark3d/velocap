export class DateRange {
  public rangeArray = [];

  constructor(
    private startDate: Date,
    private endDate: Date,
    weekends = false,
  ) {
    while (startDate < endDate) {
      (weekends || DateRange.isWeekDay(startDate)) &&
        this.rangeArray.push(startDate.toISOString().split('T')[0]);
      startDate.setDate(startDate.getDate() + 1);
    }
  }

  static getDateRange(startDate: string, endDate: string, weekends = false): any[] {
    return new this(new Date(startDate), new Date(endDate), weekends)
      .rangeArray;
  }

  public static isWeekDay(date: Date): boolean {
    return date.getDay() % 6 !== 0;
  }
}
