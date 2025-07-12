import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { StatusCodesList } from 'src/config/constants/statusCode.constants';
import { DatabaseService } from 'src/database/database.service';
import { AppConfigService } from 'src/config/config.service';
import { RoleConstants } from 'src/role/constants/role.constants';
import { Reflector } from '@nestjs/core';


@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const permissionObject = this.reflector.get<string>('permissionObject', context.getHandler());
        // console.log("permission-accessing: ",permissionObject)

        // console.log(user)
        if (user.role.slug != RoleConstants.admin.slug) {
            // do permission checking
            let checkPermission = await this.checkPermission(permissionObject, user.role.role_menu)
            if(!checkPermission) {
                // throw new UnauthorizedException('Unauthrized');
                throw new UnauthorizedException(
                'forbidden',
                `${StatusCodesList.Forbidden}`,
            );
            }
            return true
        } else {
            return true;
        }
    }

    async checkPermission(permissionObject, permission):Promise<boolean> {
        let menuArr = permission.filter(function (el) {
            return el.menu.slug == permissionObject.menu;
        });

        if(menuArr.length != 1) {
            return false;
        }
        // console.log(menuArr[0].menu.menu_permission);
        
        let permissionArr = menuArr[0].menu.menu_permission.filter(function(el) {
            return el.permission.slug == permissionObject.permission;
        })

        if(permissionArr.length != 1) {
            return false
        }
        return true
    }
}
