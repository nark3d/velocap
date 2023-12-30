import { Test, TestingModule } from '@nestjs/testing';
import { JiraProjectService } from './jira-project.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JiraProject } from './entities/jira-project.entity';

describe('Jira Project Service', () => {
  let service: JiraProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JiraProjectService,
        {
          provide: getRepositoryToken(JiraProject),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<JiraProjectService>(JiraProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
