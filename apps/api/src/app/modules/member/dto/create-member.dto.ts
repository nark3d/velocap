import { AbstractDto } from '../../../lib/abstract/abstract.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMemberDto extends AbstractDto {
  @IsNotEmpty()
  @IsInt()
  roleId: number;

  @IsNotEmpty()
  name: string;
}
