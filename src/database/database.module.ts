import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigModule } from 'src/config/config.module';


@Module({
  imports: [ConfigModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
