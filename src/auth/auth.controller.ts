import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ILoginDataRo } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('/login')
    async login(
        @Body(ValidationPipe) loginDto: LoginDto,
    ): Promise<ILoginDataRo> {
        return this.authService.login(loginDto)
    }

    @Post('/register')
    async register(
        @Body(ValidationPipe) registerDto: RegisterDto,
    ): Promise<boolean> {
        return this.authService.register(registerDto)
    }
}
