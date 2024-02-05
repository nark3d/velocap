import { Repository } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { AbstractService } from './abstract.service';

class TestEntity extends AbstractEntity {}

class TestRepository extends Repository<TestEntity> {}
class TestService extends AbstractService<TestEntity> {
  constructor(
    private readonly testRepository: TestRepository,
  ) {
    super(testRepository);
  }
}

jest.mock('typeorm', () => ({
  Repository: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
    update: jest.fn(),
    findAndCount: jest.fn().mockReturnValue([['data'], 1]),
    findOneBy: jest.fn().mockReturnValue('data'),
    delete: jest.fn(),
    upsert: jest.fn(),
  })),
  BaseEntity: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
  CreateDateColumn: jest.fn(),
  UpdateDateColumn: jest.fn(),

}));

describe('AbstractService', () => {
  describe('create', () => {
    it('should call the repository save method', async () => {
      const repository = new Repository(TestEntity, null)
      await new TestService(repository).create(new TestEntity());
      expect(repository.save).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    it('should call the repository update method', async () => {
      const repository = new Repository(TestEntity, null)
      await new TestService(repository).update(1, new TestEntity());
      expect(repository.update).toHaveBeenCalled();
    });
  });
  describe('findAll', () => {
    it('should call the repository findAndCount method', async () => {
      const repository = new Repository(TestEntity, null)
      await new TestService(repository).findAll();
      expect(repository.findAndCount).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should call the repository findOne method', async () => {
      const repository = new Repository(TestEntity, null)
      await new TestService(repository).findOne(1);
      expect(repository.findOneBy).toHaveBeenCalled();
    });
  });
  describe('findOneBy', () => {
    it('should call the repository findOne method', async () => {
      const repository = new Repository(TestEntity, null)
      await new TestService(repository).findOneBy({ id: 1 });
      expect(repository.findOneBy).toHaveBeenCalled();
    });
  });
  describe('remove', () => {
    it('should call the repository delete method', async () => {
      const repository = new Repository(TestEntity, null)
      await new TestService(repository).remove(1);
      expect(repository.delete).toHaveBeenCalled();
    });
  });
  describe('batchUpsert', () => {
    it('should call the repository upsert method', async () => {
      const repository = new Repository(TestEntity, null)
      await new TestService(repository).batchUpsert([new TestEntity()]);
      expect(repository.upsert).toHaveBeenCalled();
    });
  });
});
