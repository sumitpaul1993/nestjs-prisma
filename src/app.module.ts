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
import { JWTService } from './common/module/jwt.service';
import { CommonModule } from './common/module/common.module';
import { DocumentModule } from './document/document.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public/upload'),
      exclude: ['/api/{*test}'],
      serveStaticOptions: {
        fallthrough: false,
      },
      // serveRoot: '/upload/',
    }),
    ConfigModule,
    DatabaseModule,
    CommonModule,
    AuthModule,
    RoleModule,
    MenuModule,
    DocumentModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: CustomValidationPipe
    },
    AppService,
    JWTService,

  ],
  controllers: [AppController],
})
export class AppModule { }
