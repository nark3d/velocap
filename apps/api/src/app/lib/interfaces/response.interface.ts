import { AbstractEntity } from '../abstract/abstract.entity';

export interface ResponseInterface<T extends AbstractEntity> {
  data: T[];
  meta: { count: number };
}
