import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppConfigService } from 'src/config/config.service';


@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor(public readonly configService: AppConfigService) {
    // console.log('configService.databaseUrl', configService.databaseUrl);
    super({
      datasources: {
        db: {
          url: configService.databaseUrl,
        },
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
