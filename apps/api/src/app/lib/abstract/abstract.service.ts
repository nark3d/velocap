import {
  FindManyOptions,
  FindOptionsWhere,
  InsertResult,
  Repository,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { AbstractDto } from './abstract.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpsertOptions } from 'typeorm/repository/UpsertOptions';
import { NotFoundException } from '@nestjs/common';

export abstract class AbstractService<T extends AbstractEntity> {
  protected constructor(protected readonly repository: Repository<T>) {}

  create(createDto: AbstractDto): Promise<T> {
    return this.repository.save(createDto as T);
  }

  async update(id: number, updateDto: AbstractDto): Promise<T> {
    await this.repository.update(
      { id: id } as FindOptionsWhere<T>,
      updateDto as unknown as QueryDeepPartialEntity<T>,
    );
    return this.findOne(id);
  }

  findAll(findManyOptions?: FindManyOptions<T>): Promise<[T[], number]> {
    return this.repository.findAndCount({
      // @todo things that make you go hmmm...
      ...({ order: { id: 'DESC' } } as FindManyOptions<T>),
      ...findManyOptions,
    });
  }

  findOne(id: number, customErrorMessage?: string): Promise<T> {
    return this.findOneBy({ id: id } as FindOptionsWhere<T>, customErrorMessage);
  }

  async findOneBy(where: FindOptionsWhere<T>, customErrorMessage?: string): Promise<T | null> {
    const record = await this.repository.findOneBy(where);
    if (!record) {
      throw new NotFoundException(customErrorMessage || 'Record not found');
    }
    return record;
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async upsert(
    createDto: AbstractDto,
    uniqueIdentifier: string,
  ): Promise<T> {
    return this.repository.save(
      await this.upsertCreateOrMerge(
        await this.repository.findOneBy({
          [uniqueIdentifier]: createDto[uniqueIdentifier]
        } as FindOptionsWhere<T>),
        createDto
      )
    );
  }

  private async upsertCreateOrMerge(entity: T, createDto: AbstractDto) {
    return entity
      ? this.repository.merge(entity, createDto as T)
      : this.repository.create(createDto as T);
  }

  // @todo - make this return all the id's - this isn't good enough
  public async batchUpsert(
    createDtos: AbstractDto[],
    conflictPathOrOptions: string[] | UpsertOptions<T> = ['id'],
  ): Promise<InsertResult> {
    return await this.repository.upsert(
      createDtos as QueryDeepPartialEntity<T>,
      conflictPathOrOptions,
    );
  }
}
