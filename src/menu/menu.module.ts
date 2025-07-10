import { Module } from '@nestjs/common';
// import { BcryptService } from 'src/common/service/bcrypt.service';
import { DeleteFilterService } from 'src/common/service/deleteFilter.service';
// import { AppConfigService } from 'src/config/config.service';
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
    MenuService,
    // BcryptService,
    // AppConfigService
  ]
})
export class MenuModule { }
