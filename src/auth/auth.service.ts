import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BcryptService } from 'src/common/service/bcrypt.service';
import { DeleteFilterService } from 'src/common/service/deleteFilter.service';
import { JWTService } from 'src/common/service/jwt.service';
import { AppConfigService } from 'src/config/config.service';
import { DatabaseService } from 'src/database/database.service';
import { RoleConstants } from 'src/role/constants/role.constants';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ILoginDataRo } from './interface/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly deleteFilterService: DeleteFilterService,
        private readonly bcryptService: BcryptService,
        private readonly appConfigService: AppConfigService,
        private readonly jwtService: JWTService
    ) { }

    /**
     * Login method
    */
    async login(loginDto: LoginDto): Promise<ILoginDataRo> {
        const {
            email,
            password
        } = loginDto;

        //check user exist or not
        let userDetails: {
            id: string
            password: string
        } | null;

        try {
            userDetails = await this.prisma.user.findFirst({
                where: this.deleteFilterService.filterDeleted({ email: email }),
                select: {
                    id: true,
                    password: true
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

        if (!userDetails) {
            throw new HttpException({
                statusCode: 406,
                error: 'Wrong credentials!',
                message: [
                    {
                        value: '',
                        msg: 'Wrong credentials.',
                        param: 'global',
                        location: 'body',
                    },
                ],
            }, HttpStatus.NOT_ACCEPTABLE)
        }

        let comparePassword: boolean = await this.bcryptService.comparePassword(password, userDetails.password)

        if (!comparePassword) {
            throw new HttpException({
                statusCode: 406,
                error: 'Wrong credentials!',
                message: [
                    {
                        value: '',
                        msg: 'Wrong credentials.',
                        param: 'global',
                        location: 'body',
                    },
                ],
            }, HttpStatus.NOT_ACCEPTABLE)
        }
        let accessToken = await this.jwtService.createToken({
            id: userDetails.id,
        }, this.appConfigService.JWTSecret);

        let refreshToken = await this.jwtService.createToken({
            id: userDetails.id,
        }, this.appConfigService.JWTSecret, '24h');

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }

    /**
     * Register method
    */
    async register(registerDto: RegisterDto): Promise<boolean> {
        const {
            email,
            name,
            password,
            roleId
        } = registerDto;

        //check user exist or not
        let userDetails: {
            id: string
        } | null;

        try {
            userDetails = await this.prisma.user.findFirst({
                where: { email: email },
                select: {
                    id: true
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

        if (userDetails) {
            throw new HttpException({
                statusCode: 406,
                error: 'Email exist!',
                message: [
                    {
                        value: '',
                        msg: 'Email exist.',
                        param: 'email',
                        location: 'body',
                    },
                ],
            }, HttpStatus.NOT_ACCEPTABLE)
        }

        if (await this.checkRoleIsAdmin(roleId)) {
            throw new HttpException({
                statusCode: 406,
                error: 'Cannot register as admin!',
                message: [
                    {
                        value: '',
                        msg: 'Cannot register as admin.',
                        param: 'roleId',
                        location: 'body',
                    },
                ],
            }, HttpStatus.NOT_ACCEPTABLE)
        }

        let passwordHash = await this.bcryptService.hashPassword(password)
        

        try {
            await this.prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash,
                    role_id: roleId
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

        return true
    }

    /**
     * Check role is admin 
    */
    async checkRoleIsAdmin(id: string): Promise<boolean> {
        let isAdmin: {
            slug: string
        } | null
        try {
            isAdmin = await this.prisma.role.findFirst({
                where: { id: id },
                select: { slug: true }
            })
        } catch (e) {
            console.log(e)
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'internal_error',
                error: e,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return (isAdmin && (isAdmin.slug == RoleConstants.admin.slug)) ? true : false;
    }
}
