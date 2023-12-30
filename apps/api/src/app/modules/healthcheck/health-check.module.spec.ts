import { HealthCheckModule } from './health-check.module';
import { Test } from '@nestjs/testing';

describe('Health Check Module', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [HealthCheckModule],
    }).compile();

    expect(module).toBeDefined();
  });
});
