import { AbstractDto } from '../../../lib/abstract/abstract.dto';
import {IsInt, IsNotEmpty, IsNumber} from 'class-validator';

export class CreateActivityDto extends AbstractDto {
  @IsNotEmpty()
  @IsInt()
  availabilityId: number;

  @IsNotEmpty()
  @IsInt()
  activityTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  public minutes: number;
}
