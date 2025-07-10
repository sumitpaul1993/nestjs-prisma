import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { APP_PIPE } from '@nestjs/core';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { CustomValidationPipe } from './common/pipe/customValidation.pipe';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    RoleModule,
    MenuModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: CustomValidationPipe
    },
    AppService
  ],
  controllers: [AppController],
})
export class AppModule { }
