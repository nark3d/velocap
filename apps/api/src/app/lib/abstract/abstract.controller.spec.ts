import { AbstractController } from './abstract.controller';
import { AbstractService } from './abstract.service';
import { AbstractEntity } from './abstract.entity';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractDto } from './abstract.dto';
import { Body } from '@nestjs/common';

class TestDto extends AbstractDto {}

class TestEntity extends AbstractEntity {}

class TestService extends AbstractService<TestEntity> {
  constructor(
    @InjectRepository(TestEntity)
    private readonly testRepository: Repository<TestEntity>,
  ) {
    super(testRepository);
  }
}

class TestController extends AbstractController<TestEntity> {
  constructor(private readonly testService: AbstractService<TestEntity>) {
    super(testService);
  }

  public create(@Body() testDto: TestDto): Promise<TestEntity> {
    return super.create(testDto);
  }

  public update(id: string, @Body() testDto: TestDto): Promise<TestEntity> {
    return super.update(id, testDto);
  }
}

jest.mock('./abstract.dto');
jest.mock('./abstract.entity');
jest.mock('./abstract.service', () => ({
  AbstractService: jest.fn().mockImplementation(() => ({
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn().mockReturnValue([['data'], 1]),
    findOne: jest.fn().mockReturnValue('data'),
  })),
}));

describe('AbstractController', () => {

  describe('findAll', () => {
    it('should return an array of test entities', async () => {
      const service = new TestService(null);
      const result = await new TestController(service).findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual({ data: ['data'], meta: { count: 1 } });
    });
  });

  describe('findOne', () => {
    it('should call the service findOne method', async () => {
      const service = new TestService(null);
      const result = await new TestController(service).findOne('1');
      expect(service.findOne).toHaveBeenCalled();
      expect(result).toEqual('data');
    });
  });

  describe('remove', () => {
    it('should call the service remove method', () => {
      const service = new TestService(null);
      new TestController(service).remove('1');
      expect(service.remove).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should call the service create method', () => {
      const service = new TestService(null);
      new TestController(service).create(new TestDto());
      expect(service.create).toHaveBeenCalled();
      });
  });

  describe('update', () => {
    it('should call the service update method', () => {
      const service = new TestService(null);
      new TestController(service).update('1', new TestDto());
      expect(service.update).toHaveBeenCalled();
      });
  });
});
