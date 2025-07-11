import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/module/common.module';
import { DeleteFilterService } from 'src/common/module/deleteFilter.service';
import { AppConfigService } from 'src/config/config.service';
import { DatabaseModule } from 'src/database/database.module';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    CommonModule
  ],
  controllers: [DocumentController],
  providers: [
    DeleteFilterService,
    DocumentService,
    AppConfigService
  ]
})
export class DocumentModule { }
