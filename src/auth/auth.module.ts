import { Module } from '@nestjs/common';
import { BcryptService } from 'src/common/service/bcrypt.service';
import { DeleteFilterService } from 'src/common/service/deleteFilter.service';
import { JWTService } from 'src/common/service/jwt.service';
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
  ]
})
export class AuthModule { }
