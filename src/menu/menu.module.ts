import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MenuController } from './menu.controller';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [MenuController],
  providers: [

  ]
})
export class MenuModule { }
