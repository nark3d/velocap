import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { AbstractService } from '../../lib/abstract/abstract.service';

@Injectable()
export class MemberService extends AbstractService<Member> {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {
    super(memberRepository);
  }

  findAll(
    findManyOptions?: FindManyOptions<Member>,
  ): Promise<[Member[], number]> {
    return super.findAll({
      ...findManyOptions,
      order: { name: 'ASC' },
    });
  }
}
