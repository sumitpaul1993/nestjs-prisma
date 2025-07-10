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


@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if(user.role.slug != RoleConstants.admin.slug) {
            // do permission checking
            return true
        }else {
            return true;
        }
    }
}
