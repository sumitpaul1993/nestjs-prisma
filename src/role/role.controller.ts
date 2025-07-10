import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
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

    @UseGuards(AuthGuard, PermissionGuard)
    @ApiBearerAuth()
    @Post()
    setPermission(
    ) {
        return 1
    }
}
