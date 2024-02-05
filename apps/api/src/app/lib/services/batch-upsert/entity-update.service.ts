import { DeepPartial, Repository } from 'typeorm';
import { AbstractEntity } from '../../abstract/abstract.entity';
import { AbstractDto } from '../../abstract/abstract.dto';

export class EntityUpdateService<E extends AbstractEntity, D extends AbstractDto> {
  async updateEntities(
    repository: Repository<E>,
    updateDtos: Partial<D>[],
    existingEntities: E[],
    idProperty: keyof E & keyof D
  ): Promise<E[]> {
    return repository.save(updateDtos.map(dto => {
      const existingEntity = this.findExistingEntity(existingEntities, dto, idProperty);
      return repository.merge(existingEntity, dto as unknown as DeepPartial<E>);
    }));
  }

  private findExistingEntity (
    existingEntities: E[],
    dto: Partial<D>,
    idProperty: keyof E & keyof D
  ): E {
    // @todo I've forced thd type here to be a key of E, but it should be a key of D.  Fix this later.
    return existingEntities.find(entity => entity[idProperty] === +dto[idProperty] as unknown as E[keyof E]);
  }
}
