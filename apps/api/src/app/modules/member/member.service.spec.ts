import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from './member.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import {AbstractService} from '../../lib/abstract/abstract.service';

describe('MemberService', () => {
  let service: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: getRepositoryToken(Member),
          useValue: {
            findAndCount: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call the findAll method of the abstract service', async () => {
    const abstractFindAll = jest.spyOn(AbstractService.prototype as any, 'findAll');
    await service.findAll();
    expect(abstractFindAll).toHaveBeenCalled();
  });
});
