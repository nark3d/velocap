import { AbstractDto } from '../../../lib/abstract/abstract.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto extends AbstractDto {
  @IsNotEmpty()
  public value: string;
}
