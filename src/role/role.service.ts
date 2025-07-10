import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteFilterService } from 'src/common/module/deleteFilter.service';
import { DatabaseService } from 'src/database/database.service';
import { EditPermissionDto } from './dto/editPermission.dto';
import { IGetAllRoleDataRo } from './interface/role.interface';

@Injectable()
export class RoleService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly deleteFilterService: DeleteFilterService
    ) { }

    /**
     * Get all roles
    */
    async getRoles(): Promise<IGetAllRoleDataRo[]> {
        let roles: IGetAllRoleDataRo[]

        try {
            roles = await this.prisma.role.findMany({
                where: this.deleteFilterService.filterDeleted(),
                select: {
                    id: true,
                    name: true,
                    slug: true
                },
                orderBy: {
                    name: "asc"
                }
            })
        } catch (e) {
            console.log(e)
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'internal_error',
                error: e,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return roles;
    }

    async editRolePermission(editPermissionDto: EditPermissionDto) {
        const { menuPermission, roleId } = editPermissionDto;
        let roleMenu: {
            menu_id: string
            role_id: string
        }[] = []
        let rolePermission: {
            menu_id: string
            role_id: string
            permission_id: string
        }[] = []

        for (let i of menuPermission) {
            roleMenu.push({
                menu_id: i.menuId,
                role_id: roleId
            })
            for (let j of i.permission) {
                rolePermission.push({
                    menu_id: i.menuId,
                    permission_id: j.permissionId,
                    role_id: roleId
                })
            }
        }

        try {
            await this.prisma.roleMenu.deleteMany({
                where: {
                    role_id: roleId
                }
            })
            await this.prisma.rolePermission.deleteMany({
                where: {
                    role_id: roleId
                }
            })
            await this.prisma.roleMenu.createMany({
                data: roleMenu,
                skipDuplicates: true
            })
            await this.prisma.rolePermission.createMany({
                data: rolePermission,
                skipDuplicates: true
            })
        } catch (e) {
            console.log(e)
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'internal_error',
                error: e,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        return true
    }
}
