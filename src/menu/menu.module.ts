import { Module } from '@nestjs/common';
import { DeleteFilterService } from 'src/common/service/deleteFilter.service';
import { DatabaseModule } from 'src/database/database.module';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [MenuController],
  providers: [
    DeleteFilterService,
    MenuService
  ]
})
export class MenuModule { }
