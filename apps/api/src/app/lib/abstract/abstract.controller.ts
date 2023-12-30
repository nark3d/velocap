import { AbstractService } from './abstract.service';
import { Delete, Get, Param } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import { AbstractDto } from './abstract.dto';
import { ResponseInterface } from '../interfaces/response.interface';
import { FindManyOptions } from 'typeorm';

export class AbstractController<T extends AbstractEntity> {
  protected constructor(protected service: AbstractService<T>) {}

  @Get()
  async findAll(
    findManyOptions?: FindManyOptions,
  ): Promise<ResponseInterface<T>> {
    const [data, count] = await this.service.findAll(findManyOptions);
    return { data, meta: { count } };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<T> {
    return this.service.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }

  protected create(createDto: AbstractDto): Promise<T> {
    return this.service.create(createDto);
  }

  protected update(id: string, updateDto: AbstractDto): Promise<T> {
    return this.service.update(+id, updateDto);
  }
}
