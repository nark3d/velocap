import { AbstractDto } from '../../../lib/abstract/abstract.dto';

export class CreateSettingDto extends AbstractDto {
  key: string;
  value: string;
}
