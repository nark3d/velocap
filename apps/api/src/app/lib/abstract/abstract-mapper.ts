import { JiraTypes } from '../interfaces/jira-types';
import { AbstractDto } from './abstract.dto';


export abstract class AbstractMapper<T extends JiraTypes, T2 extends AbstractDto> {

  public map(records: T[]):  Partial<T2>[] {
    return records.map(record => this.fieldsToMap(record));
  }

  protected convertToDate(date: string): Date {
    return new Date(date);
  }

  protected abstract fieldsToMap(record: T): Partial<T2>;
}
