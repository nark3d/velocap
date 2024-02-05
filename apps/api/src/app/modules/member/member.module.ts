import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { PaginationService } from '../../lib/services/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberService, PaginationService],
  exports: [MemberService],
})
export class MemberModule {}
