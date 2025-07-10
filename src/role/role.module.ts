import { Module } from '@nestjs/common';
import { DeleteFilterService } from 'src/common/service/deleteFilter.service';
import { DatabaseModule } from 'src/database/database.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [RoleController],
  providers: [
      RoleService,
      DeleteFilterService
  ]
})
export class RoleModule { }
