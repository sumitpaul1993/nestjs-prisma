import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  // ConfigService,
} from '@nestjs/config';
import { AppConfigService } from './config.service';
import { validationSchema } from './config.validation';
import * as path from 'path';
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(
        __dirname,
        `../../${process.env.NODE_ENV || 'local'}.env`,
      ),
      validationSchema, // Validate env variables
      expandVariables: true, // Allow expandable variables
    }),
  ],
  // providers: [ConfigService],
  providers: [AppConfigService],
  exports: [AppConfigService], // Ensure it can be used elsewhere
})
export class ConfigModule {}
