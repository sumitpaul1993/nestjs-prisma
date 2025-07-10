import { Controller, Get } from '@nestjs/common';
import { IGetAllRoleDataRo } from './interface/role.interface';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(
        private readonly roleService: RoleService
    ) { }

    @Get()
    getRoles(
    ): Promise<IGetAllRoleDataRo[]> {
        return this.roleService.getRoles();
    }
}
