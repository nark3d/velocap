import { AbstractDto } from '../../../lib/abstract/abstract.dto';
import { CreateDayDto } from '../../day/dto/create-day.dto';

export class CreateAvailabilityDto extends AbstractDto {
  // @IsNotEmpty()
  // @IsInt()
  public minutes: number;

  // @IsNotEmpty()
  // @IsInt()
  public memberId: number;

  // @IsNotEmpty()
  date: CreateDayDto['date'];

  public dayId: number;
}
