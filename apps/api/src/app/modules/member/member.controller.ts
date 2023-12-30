import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { AbstractController } from '../../lib/abstract/abstract.controller';
import { Member } from './entities/member.entity';

@Controller('member')
export class MemberController extends AbstractController<Member> {
  constructor(private readonly memberService: MemberService) {
    super(memberService);
  }

  @Post()
  create(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    return super.create(createMemberDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    return super.update(id, updateMemberDto);
  }
}
