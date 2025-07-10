import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteFilterService } from 'src/common/service/deleteFilter.service';
import { DatabaseService } from 'src/database/database.service';
import { IGetAllMenuDataRo } from './interface/menu.interface';

@Injectable()
export class MenuService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly deleteFilterService: DeleteFilterService,
    ) { }

    /**
     * Get all menus with permission list
    */
    async getMenuPermissions():Promise<IGetAllMenuDataRo[]> {
        let menus:IGetAllMenuDataRo[]

        try {
            menus = await this.prisma.menu.findMany({
                where: this.deleteFilterService.filterDeleted(),
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    permission: {
                        where: this.deleteFilterService.filterDeleted(),
                        select: {
                            id: true,
                            name: true,
                            slug: true
                        }
                    }
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
            },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

        return menus;
    }
}
