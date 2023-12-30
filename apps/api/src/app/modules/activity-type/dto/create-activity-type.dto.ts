import { AbstractDto } from '../../../lib/abstract/abstract.dto';
import {IsBoolean, IsNotEmpty, IsOptional} from 'class-validator';

export class CreateActivityTypeDto extends AbstractDto {
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  ceremony: boolean;
}
