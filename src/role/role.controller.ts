import { Body, Controller, Get, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CustomMetaValue } from 'src/common/decorator/customMeta.decorator';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { MenuPermissionConstants } from 'src/menu/constants/menuPermission.constants';
import { EditPermissionDto } from './dto/editPermission.dto';
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

    @CustomMetaValue({
        menu: MenuPermissionConstants.role.menuSlug,
        permission: MenuPermissionConstants.role.permissions.updatePermission.slug
    })
    @UseGuards(AuthGuard, PermissionGuard)
    @ApiBearerAuth()
    @Put('/permission')
    editRolePermission(
        @Body(ValidationPipe) editPermissionDto: EditPermissionDto,
    ) {

        return this.roleService.editRolePermission(editPermissionDto)
    }
}
