import { DeepPartial, Repository } from 'typeorm';
import { AbstractEntity } from '../../abstract/abstract.entity';
import { AbstractDto } from '../../abstract/abstract.dto';

export class EntityCreateService<E extends AbstractEntity, D extends AbstractDto> {
  async createEntities(
    repository: Repository<E>,
    createDtos: Partial<D>[]
  ): Promise<E[]> {
    return repository.save(createDtos.map(dto => repository.create(dto as unknown as DeepPartial<E>)));
  }
}
