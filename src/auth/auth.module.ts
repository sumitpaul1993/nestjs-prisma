import { Module } from '@nestjs/common';
import { BcryptService } from 'src/common/module/bcrypt.service';
import { DeleteFilterService } from 'src/common/module/deleteFilter.service';
import { JWTService } from 'src/common/module/jwt.service';
import { AppConfigService } from 'src/config/config.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
      AuthService,
      DeleteFilterService,
      BcryptService,
      AppConfigService,
      JWTService
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule { }
