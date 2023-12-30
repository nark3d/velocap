import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AbstractController } from '../../lib/abstract/abstract.controller';
import { Role } from './entities/role.entity';

@Controller('role')
export class RoleController extends AbstractController<Role> {
  constructor(private readonly roleService: RoleService) {
    super(roleService);
  }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return super.create(createRoleDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return super.update(id, updateRoleDto);
  }
}
