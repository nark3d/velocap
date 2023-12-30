import { Test, TestingModule } from '@nestjs/testing';
import { JiraProjectController } from './jira-project.controller';
import { JiraProjectService } from './jira-project.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JiraProject } from './entities/jira-project.entity';
import {AbstractController} from '../../lib/abstract/abstract.controller';
import {CreateJiraProjectDto} from './dto/create-jira-project.dto';

describe('Jira Project Controller', () => {
  let controller: JiraProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JiraProjectController],
      providers: [
        JiraProjectService,
        {
          provide: getRepositoryToken(JiraProject),
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<JiraProjectController>(JiraProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the create method of the abstract controller', () => {
    const abstractCreate = jest.spyOn(AbstractController.prototype as any, 'create');
    controller.create({} as CreateJiraProjectDto);
    expect(abstractCreate).toHaveBeenCalled();
  });

  it('should call the update method of the abstract controller', () => {
    const abstractUpdate = jest.spyOn(AbstractController.prototype as any, 'update');
    controller.update('1', {} as CreateJiraProjectDto);
    expect(abstractUpdate).toHaveBeenCalled();
  });
});
