import { AbstractDto } from '../../../lib/abstract/abstract.dto';
import { CreateDayDto } from '../../day/dto/create-day.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSprintDto extends AbstractDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  startPoints: number;

  @IsNotEmpty()
  @IsInt()
  endPoints: number;

  @IsNotEmpty()
  @IsInt()
  completedPoints: number;

  @IsNotEmpty()
  @IsInt()
  startIssues: number;

  @IsNotEmpty()
  @IsInt()
  endIssues: number;

  @IsNotEmpty()
  @IsInt()
  completedIssues: number;

  @IsNotEmpty()
  startDate: CreateDayDto['date'];

  @IsNotEmpty()
  endDate: CreateDayDto['date'];

  startDayId: number;
  endDayId: number;
}
