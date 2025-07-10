import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BcryptService } from 'src/common/service/bcrypt.service';
import { DeleteFilterService } from 'src/common/service/deleteFilter.service';
import { DatabaseService } from 'src/database/database.service';
import { IGetAllMenuDataRo } from './interface/menu.interface';

@Injectable()
export class MenuService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly deleteFilterService: DeleteFilterService,
        // private readonly bcryptService: BcryptService,
    ) { }

    /**
     * Get all menus with permission list
    */
    async getMenuPermissions():Promise<IGetAllMenuDataRo[]> {
        let menus:IGetAllMenuDataRo[]
        
        // let hash = await this.bcryptService.hashPassword("Sumit2025", 10)
        // console.log(hash) //$2b$10$4q1Lf2VrioFbaVeSk8P/2e4wPHe1U8e6/q9SzEYEQA1yzu7HZREru
        // console.log(await this.bcryptService.comparePassword("Sumit2025", hash))

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
