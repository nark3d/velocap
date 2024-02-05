import { DtoSeparationService } from './dto-separate.service';
import { AbstractEntity } from '../../abstract/abstract.entity';
import { EntityFetchService } from './entity-fetch.service';
import { EntityCreateService } from './entity-create.service';
import { EntityUpdateService } from './entity-update.service';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AbstractDto } from '../../abstract/abstract.dto';

@Injectable()
export class BatchUpsertService<E extends AbstractEntity, D extends AbstractDto> {
  constructor(
    private entityFetchService: EntityFetchService<E, D>,
    private dtoSeparationService: DtoSeparationService<E, D>,
    private entityCreateService: EntityCreateService<E, D>,
    private entityUpdateService: EntityUpdateService<E, D>,
  ) {}

  async batchUpsertEntities(
    repository: Repository<E>,
    inputDtos: Partial<D>[],
    idProperty: keyof E & keyof D
  ): Promise<E[]> {
    const existingEntities = await this.entityFetchService.fetchExistingEntities(repository, inputDtos, idProperty);
    const { updateDtos, createDtos } =
      this.dtoSeparationService.separateDtos(inputDtos, existingEntities, idProperty);
    const createdEntities = await this.entityCreateService.createEntities(repository, createDtos);
    const updatedEntities =
      await this.entityUpdateService.updateEntities(repository, updateDtos, existingEntities, idProperty);
    return [...createdEntities, ...updatedEntities];
  }

}
