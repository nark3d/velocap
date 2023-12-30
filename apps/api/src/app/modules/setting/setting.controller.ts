import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { SettingService } from './setting.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { AbstractController } from '../../lib/abstract/abstract.controller';
import { Setting } from './entities/setting.entity';
import { InsertResult } from 'typeorm';

@Controller('setting')
export class SettingController extends AbstractController<Setting> {
  constructor(private readonly settingService: SettingService) {
    super(settingService);
  }

  @Post()
  create(@Body() createSettingDto: CreateSettingDto): Promise<Setting> {
    return super.create(createSettingDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    return super.update(id, updateSettingDto);
  }

  @Get('key/:key')
  getByKey(@Param('key') key: string): Promise<Setting> {
    return this.settingService.getByKey(key);
  }

  @Put('key/:key')
  upsertByKey(
    @Param('key') key: string,
    @Body('value') value: string
  ): Promise<Setting> {
    return this.settingService.upsertByKey(key, value);
  }
}
