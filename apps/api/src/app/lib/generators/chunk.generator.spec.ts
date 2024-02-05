import { Test, TestingModule } from '@nestjs/testing';
import ChunkGenerator from './chunk.generator';
import ProgressSSeService from '../services/sse/progress.service';


describe('ChunkGenerator', () => {
  let chunkGenerator: ChunkGenerator;
  let progressService: ProgressSSeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChunkGenerator,
        {
          provide: 'ProgressSSeService',
          useValue: {
            updateProgress: jest.fn(),
            complete: jest.fn(),
          },
        },
      ],
    }).compile();
    chunkGenerator = module.get<ChunkGenerator>(ChunkGenerator);
    progressService = module.get('ProgressSSeService');
    chunkGenerator.setSseProgressService(progressService);
  });

  it('should generate chunks correctly', async () => {
    const fetchMethod = jest.fn().mockImplementation((start, maxResults) => Promise.resolve(Array(maxResults).fill(start)));
    const processMethod = jest.fn().mockImplementation(() => Promise.resolve());
    const total = 10;
    const maxResults = 2;

    await chunkGenerator.chunk(fetchMethod, processMethod, total, maxResults);

    expect(fetchMethod).toHaveBeenCalledTimes(5);
    expect(processMethod).toHaveBeenCalledTimes(5);
    expect(progressService.updateProgress).toHaveBeenCalledTimes(5);
    expect(progressService.complete).toHaveBeenCalledTimes(1);
  });

  it('should handle zero total correctly', async () => {
    const fetchMethod = jest.fn().mockImplementation(() => Promise.resolve([]));
    const processMethod = jest.fn().mockImplementation(() => Promise.resolve());
    const total = 0;
    const maxResults = 2;

    await chunkGenerator.chunk(fetchMethod, processMethod, total, maxResults);

    expect(fetchMethod).toHaveBeenCalledTimes(0);
    expect(processMethod).toHaveBeenCalledTimes(0);
    expect(progressService.updateProgress).toHaveBeenCalledTimes(0);
    expect(progressService.complete).toHaveBeenCalledTimes(1);
  });

  it('should handle total less than maxResults correctly', async () => {
    const fetchMethod = jest.fn().mockImplementation((start, maxResults) => Promise.resolve(Array(maxResults).fill(start)));
    const processMethod = jest.fn().mockImplementation(() => Promise.resolve());
    const total = 1;
    const maxResults = 2;

    await chunkGenerator.chunk(fetchMethod, processMethod, total, maxResults);

    expect(fetchMethod).toHaveBeenCalledTimes(1);
    expect(processMethod).toHaveBeenCalledTimes(1);
    expect(progressService.updateProgress).toHaveBeenCalledTimes(1);
    expect(progressService.complete).toHaveBeenCalledTimes(1);
  });
});
