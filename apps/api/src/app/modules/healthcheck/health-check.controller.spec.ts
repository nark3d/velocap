import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';

describe('AppController', () => {
  let appController: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [],
    }).compile();

    appController = app.get<HealthCheckController>(HealthCheckController);
  });

  describe('root', () => {
    it('should return "Health Check OK!"', () => {
      expect(appController.getHello()).toBe('Health Check OK!');
    });
  });
});
