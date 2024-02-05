import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BatchUpsertService } from './batch-upsert.service';
import { AbstractEntity } from '../../abstract/abstract.entity';
import { AbstractDto } from '../../abstract/abstract.dto';
import { EntityFetchService } from './entity-fetch.service';
import { EntityCreateService } from './entity-create.service';
import { EntityUpdateService } from './entity-update.service';
import { DtoSeparationService } from './dto-separate.service';

describe('BatchUpsertService', () => {
  let service: BatchUpsertService<AbstractEntity, AbstractDto>;
  let repository: Repository<AbstractEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BatchUpsertService,
        {
          provide: getRepositoryToken(AbstractEntity),
          useValue: {
            upsert: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
            findAndCount: jest.fn(),
          },
        },
        {
          provide: EntityFetchService,
          useValue: {
            fetchExistingEntities: jest.fn(),
          },
        },
        {
          provide: EntityCreateService,
          useValue: {
            createEntities: jest.fn().mockReturnValue([]),
          },
        },
        {
          provide: EntityUpdateService,
          useValue: {
            updateEntities: jest.fn().mockReturnValue([]),
          },
        },
        {
          provide: DtoSeparationService,
          useValue: {
            separateDtos: jest.fn().mockImplementation((dtos, entities, idProperty) => {
              const updateDtos = dtos.filter(dto => dto[idProperty]);
              const createDtos = dtos.filter(dto => !dto[idProperty]);
              return {
                updateDtos,
                createDtos,
              };
            }),
          },
        }
      ],
    }).compile();
    service = module.get<BatchUpsertService<AbstractEntity, AbstractDto>>(BatchUpsertService);
    repository = module.get<Repository<AbstractEntity>>(getRepositoryToken(AbstractEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('batchUpsertEntities', () => {
    it('should call EntityFetchService fetchExistingEntities', async () => {
      const fetchExistingEntities =
        jest.spyOn(service['entityFetchService'], 'fetchExistingEntities');
      await service.batchUpsertEntities(repository, [], 'id');
      expect(fetchExistingEntities).toHaveBeenCalled();
    });
    it('should call DtoSeparationService separateDtos', async () => {
      const separateDtos = jest.spyOn(service['dtoSeparationService'], 'separateDtos');
      await service.batchUpsertEntities(repository, [], 'id');
      expect(separateDtos).toHaveBeenCalled();
    });
    it('should call EntityCreateService createEntities', async () => {
      const createEntities = jest.spyOn(service['entityCreateService'], 'createEntities');
      await service.batchUpsertEntities(repository, [], 'id');
      expect(createEntities).toHaveBeenCalled();
    });
    it('should call EntityUpdateService updateEntities', async () => {
      const updateEntities = jest.spyOn(service['entityUpdateService'], 'updateEntities');
      await service.batchUpsertEntities(repository, [], 'id');
      expect(updateEntities).toHaveBeenCalled();
    });
  });
});
