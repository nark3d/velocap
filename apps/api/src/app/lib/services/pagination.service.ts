import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { Page } from './pagination/page.interface';

@Injectable()
export class PaginationService<T> {
  async paginate(
    repository: Repository<T>,
    findManyOptions: FindManyOptions<T>,
    skip: number,
    take: number
  ): Promise<Page<T>> {
    const [data, count] = await repository.findAndCount({
      ...findManyOptions,
      skip,
      take
    });

    return {
      data,
      meta: {
        count,
        totalPages: Math.ceil(count / take),
        currentPage: Math.ceil(skip / take) + 1,
        pageSize: take
      }
    }
  }
}
