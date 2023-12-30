import { AbstractDto } from '../abstract/abstract.dto';
import { DayService } from '../../modules/day/day.service';

export class ControllerMutator {
  // @todo Hang on, this should live in the DTO? You've fucked up...
  public static async addDateId<T extends AbstractDto>(
    dto: T,
    dayService: DayService,
    origin: string,
    destination: string,
  ): Promise<T> {
    return {
      ...dto,
      ...{
        [destination]: await dayService.upsertFromDateAndGetId(dto[origin]),
      },
    };
  }
}
