import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../../lib/abstract/abstract.service';
import { PaginationService } from '../../lib/services/pagination.service';

@Injectable()
export class RoleService extends AbstractService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    protected readonly paginationService: PaginationService<Role>,
  ) {
    super(roleRepository, paginationService);
  }
}
