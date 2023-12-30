import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import {CreateMemberDto} from './dto/create-member.dto';
import {AbstractController} from '../../lib/abstract/abstract.controller';

describe('MemberController', () => {
  let controller: MemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [
        MemberService,
        {
          provide: getRepositoryToken(Member),
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the create method of the abstract controller', () => {
    const abstractCreate = jest.spyOn(AbstractController.prototype as any, 'create');
    controller.create({} as CreateMemberDto);
    expect(abstractCreate).toHaveBeenCalled();
  });

  it('should call the update method of the abstract controller', () => {
    const abstractUpdate = jest.spyOn(AbstractController.prototype as any, 'update');
    controller.update('1', {} as CreateMemberDto);
    expect(abstractUpdate).toHaveBeenCalled();
  });
});
