import { Test, TestingModule } from '@nestjs/testing';
import { JiraIssueService } from './jira-issue.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JiraIssue } from './entities/jira-issue.entity';
import { JiraClient } from '../../lib/utils/jiraClient';
import ProgressSSeService from '../../lib/services/sse/progress.service';
import ChunkGenerator from '../../lib/generators/chunk.generator';

describe('Jira Issue Service', () => {
  let service: JiraIssueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JiraIssueService,
        {
          provide: getRepositoryToken(JiraIssue),
          useValue: {
            upsert: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
            findAndCount: jest.fn(),
          },
        },
        {
          provide: JiraClient,
          useValue: {
            getIssueCountByProjectKey: jest.fn(),
            getIssuesByProjectKey: jest.fn().mockResolvedValue({ issues: [] }),
          },
        },
        {
          provide: ProgressSSeService,
          useValue: {
            updateProgress: jest.fn(),
            complete: jest.fn(),
            observe: jest.fn(),
          },
        },
        {
          provide: ChunkGenerator,
          useValue: {
            chunk: jest.fn().mockImplementation(async (fetchMethod, processMethod, total, maxResults) => {
              await processMethod(await fetchMethod(0, maxResults));
            }),
            setSseProgressService: jest.fn(), // Mock the method
          },
        },
      ],
    }).compile();

    service = module.get<JiraIssueService>(JiraIssueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('constructor', () => {
    it('should call the setSseProgressService method', () => {
      const setSseProgressService = jest.spyOn(service['chunkGenerator'], 'setSseProgressService');
      expect(setSseProgressService).toHaveBeenCalledWith(service['sseProgressService']);
    });
  });

  describe('populate', () => {
    it('should call the chunk and findAll method', async () => {
      const chunk = jest.spyOn(service as never, 'chunk');
      const findAll = jest.spyOn(service as never, 'findAll');
      await service.populate('TEST');
      expect(chunk).toHaveBeenCalled();
      expect(findAll).toHaveBeenCalled();
    });
  });

  describe('getProgress', () => {
    it('should call the observe method', () => {
      const observe = jest.spyOn(service['sseProgressService'], 'observe');
      service.getProgress();
      expect(observe).toHaveBeenCalled();
    });
  });

  describe('chunk', () => {
    it('should call the chunkGenerator.chunk method', async () => {
      const chunk = jest.spyOn(service['chunkGenerator'], 'chunk');
      await service.populate('TEST');
      expect(chunk).toHaveBeenCalled();
    });

    it('should call the fetchMethod and processMethod method', async () => {
      const fetchMethod = jest.spyOn(service as any, 'fetchMethod');
      const processMethod = jest.spyOn(service as any, 'processMethod');
      await service.populate('TEST');
      expect(fetchMethod).toHaveBeenCalled();
      expect(processMethod).toHaveBeenCalled();
    });
  });
});
