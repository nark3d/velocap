import { Test, TestingModule } from '@nestjs/testing';
import { JiraIssueController } from './jira-issue.controller';
import { JiraIssueService } from './jira-issue.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {AbstractController} from '../../lib/abstract/abstract.controller';
import { JiraIssue } from './entities/jira-issue.entity';
import { CreateJiraIssueDto } from './dto/create-jira-issue.dto';

describe('Jira Project Controller', () => {
  let controller: JiraIssueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JiraIssueController],
      providers: [
        JiraIssueService,
        {
          provide: getRepositoryToken(JiraIssue),
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<JiraIssueController>(JiraIssueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the create method of the abstract controller', () => {
    const abstractCreate = jest.spyOn(AbstractController.prototype as any, 'create');
    controller.create({} as CreateJiraIssueDto);
    expect(abstractCreate).toHaveBeenCalled();
  });

  it('should call the update method of the abstract controller', () => {
    const abstractUpdate = jest.spyOn(AbstractController.prototype as any, 'update');
    controller.update('1', {} as CreateJiraIssueDto);
    expect(abstractUpdate).toHaveBeenCalled();
  });
});
