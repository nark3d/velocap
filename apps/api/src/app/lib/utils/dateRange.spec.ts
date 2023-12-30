import { DateRange } from './dateRange';

describe('date utility class', () => {
  const startDate = '2022-11-23';
  const endDate = '2022-12-07';

  const noWeekendDateArray = [
    '2022-11-23',
    '2022-11-24',
    '2022-11-25',
    '2022-11-28',
    '2022-11-29',
    '2022-11-30',
    '2022-12-01',
    '2022-12-02',
    '2022-12-05',
    '2022-12-06',
  ];
  it('returns a range of days', () => {
    expect(DateRange.getDateRange(startDate, endDate, false)).toEqual(
      noWeekendDateArray,
    );
    expect(DateRange.getDateRange(startDate, endDate)).toEqual(
      noWeekendDateArray,
    );
  });
  it('returns a range of days with weekends', () => {
    const dateArray = [
      ...noWeekendDateArray,
      '2022-11-26',
      '2022-11-27',
      '2022-12-03',
      '2022-12-04',
    ].sort();
    expect(DateRange.getDateRange(startDate, endDate, true)).toEqual(dateArray);
  });
  it('returns an empty array if the end date is before the start date', () => {
    expect(DateRange.getDateRange(endDate, startDate)).toEqual([]);
  });
});

describe('detects a week day', () => {
  it('returns true for a weekend day', () => {
    expect(DateRange.isWeekDay(new Date('2022-12-05'))).toBeTruthy();
  });
  it('returns false for a week day', () => {
    expect(DateRange.isWeekDay(new Date('2022-12-04'))).toBeFalsy();
  });
});
