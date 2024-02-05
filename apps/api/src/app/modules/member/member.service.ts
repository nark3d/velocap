import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { AbstractService } from '../../lib/abstract/abstract.service';
import { PaginationService } from '../../lib/services/pagination.service';
import { Page } from '../../lib/services/pagination/page.interface';

@Injectable()
export class MemberService extends AbstractService<Member> {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    protected readonly paginationService: PaginationService<Member>,
  ) {
    super(memberRepository, paginationService);
  }

  findAll(
    findManyOptions?: FindManyOptions<Member>,
  ): Promise<Page<Member>> {
    return super.findAll({
      ...findManyOptions,
      order: { name: 'ASC' },
    });
  }
}
