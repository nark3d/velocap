import { Module } from '@nestjs/common';
import { BatchUpsertService } from './batch-upsert.service';
import { EntityFetchService } from './entity-fetch.service';
import { EntityCreateService } from './entity-create.service';
import { EntityUpdateService } from './entity-update.service';
import { DtoSeparationService } from './dto-separate.service';

@Module({
  providers: [
    BatchUpsertService,
    EntityFetchService,
    EntityCreateService,
    EntityUpdateService,
    DtoSeparationService,
  ],
  exports: [
    BatchUpsertService,
  ]
})
export class BatchUpsertModule {}
