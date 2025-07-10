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
import { DeleteFilterService } from '../module/deleteFilter.service';
import { JWTService } from '../module/jwt.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly appConfigService: AppConfigService,
        private readonly jwtService: JWTService,
        private readonly deleteFilterService: DeleteFilterService
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = (request.headers.authorization) ? request.headers.authorization.split(' ')[1] : null;

        if (!token) {
            throw new UnauthorizedException(
                'unauthorized',
                `${StatusCodesList.UnauthorizedAccess}`,
            );
        }

        let decode
        try {
            decode = await this.jwtService.verifyToken(token, this.appConfigService.JWTSecret);
        } catch (e) {
            console.log(e)
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'internal_error',
                error: e,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        let user;
        try {
            user = await this.prisma.user.findFirst({
                where: this.deleteFilterService.filterDeleted({
                    id: decode.id
                }),
                select: {
                    id: true,
                    email: true,
                    role: {
                        select: {
                            id: true,
                            slug: true,
                            role_menu: {
                                select: {
                                    menu: {
                                        select: {
                                            slug: true,
                                            menu_permission: {
                                                select: {
                                                    permission: {
                                                        select: {slug: true}
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
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

        if (!user) {
            throw new UnauthorizedException(
                'unauthorized',
                `${StatusCodesList.UnauthorizedAccess}`,
            );
        }

        request.user = user;
        return true;
    }
}
