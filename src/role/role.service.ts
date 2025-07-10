import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteFilterService } from 'src/common/module/deleteFilter.service';
import { DatabaseService } from 'src/database/database.service';
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
}
