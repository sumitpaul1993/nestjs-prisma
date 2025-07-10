import { Controller, Get } from '@nestjs/common';
import { IGetAllMenuDataRo } from './interface/menu.interface';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
    constructor(
        private readonly menuService: MenuService
    ) { }

    @Get()
    getMenuPermissions(
    ): Promise<IGetAllMenuDataRo[]> {
        return this.menuService.getMenuPermissions();
    }
}
