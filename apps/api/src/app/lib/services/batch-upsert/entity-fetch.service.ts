import { AbstractEntity } from '../../abstract/abstract.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { AbstractDto } from '../../abstract/abstract.dto';

export class EntityFetchService<E extends AbstractEntity, D extends AbstractDto> {
  async fetchExistingEntities(
    repository: Repository<E>,
    inputDtos: Partial<D>[],
    idProperty: keyof E & keyof D
  ): Promise<E[]> {
    return repository.find({ where: this.createWhereCondition(idProperty, inputDtos) });
  }

  private createWhereCondition(idProperty: keyof E & keyof D, inputDtos: Partial<D>[]): FindOptionsWhere<E> {
    return {
      [idProperty as keyof E & keyof D]: In(inputDtos.map(dto => dto[idProperty])) as FindOptionsWhere<E>[keyof E]
    } as FindOptionsWhere<E>;
  }
}
