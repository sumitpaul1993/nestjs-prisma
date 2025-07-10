import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { CommonModule } from 'src/common/module/common.module';
import { AppConfigService } from 'src/config/config.service';
import { DatabaseModule } from 'src/database/database.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    CommonModule
  ],
  controllers: [RoleController],
  providers: [
      RoleService,
      AppConfigService,
  ]
})
export class RoleModule { }
