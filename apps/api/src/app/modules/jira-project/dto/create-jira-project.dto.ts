import { AbstractDto } from '../../../lib/abstract/abstract.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Column } from 'typeorm';

export class CreateJiraProjectDto extends AbstractDto {
  @IsNotEmpty()
  @IsString()
  self: string;

  @IsNotEmpty()
  @IsNumber()
  jiraId: number;

  @IsNotEmpty()
  @IsString()
  jiraKey: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  avatarUrl: string;

  @IsNotEmpty()
  @IsString()
  style: string;

  @Column('uuid')
  @IsUUID()
  uuid: string;
}
