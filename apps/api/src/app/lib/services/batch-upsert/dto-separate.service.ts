import { AbstractEntity } from '../../abstract/abstract.entity';
import { AbstractDto } from '../../abstract/abstract.dto';

export class DtoSeparationService<E extends AbstractEntity, D extends AbstractDto> {
  separateDtos(inputDtos: Partial<D>[], existingEntities: E[], idProperty: keyof E & keyof D) {
    const updateDtos: Partial<D>[] = [];
    const createDtos: Partial<D>[] = [];
    inputDtos.forEach(dto => {
      existingEntities.some(entity =>
        this.isUpdateDto(entity, idProperty)) ? updateDtos.push(dto) : createDtos.push(dto);
    });
    return { updateDtos, createDtos };
  }

  private isUpdateDto(entity: E, idProperty: keyof E) {
    return (entity[idProperty] as E[keyof E]) === entity[idProperty];
  }
}
