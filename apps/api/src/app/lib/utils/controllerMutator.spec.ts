import { AbstractDto } from '../abstract/abstract.dto';
import { ControllerMutator } from './controllerMutator';
import { DayService } from '../../modules/day/day.service';

describe('ControllerMutator', () => {
  it('should add the date id to the DTO', async () => {
    const dto = {
      date: new Date('2022-01-01'),
    };
    const dayService = new DayService(null);
    jest.spyOn(dayService, 'upsertFromDateAndGetId').mockImplementation( () => Promise.resolve(1));
    const result = await ControllerMutator.addDateId(dto as unknown as AbstractDto, dayService, 'date', 'dateId');
    expect(result).toEqual({
      date: new Date('2022-01-01'),
      dateId: 1
    });
    expect(dayService.upsertFromDateAndGetId).toHaveBeenCalledWith(new Date('2022-01-01'));
  });
});
