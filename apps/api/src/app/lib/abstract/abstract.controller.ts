import { AbstractService } from './abstract.service';
import { Delete, Get, Param, Query } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import { AbstractDto } from './abstract.dto';
import { FindManyOptions } from 'typeorm';
import { Page } from '../services/pagination/page.interface';

export class AbstractController<T extends AbstractEntity> {
  protected constructor(protected service: AbstractService<T>) {}

  @Get()
  async findAll(
    findManyOptions?: FindManyOptions,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<Page<T>> {
    return this.service.findAll(findManyOptions, skip, take);
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
