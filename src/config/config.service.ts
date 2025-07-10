import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './config.schema';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) { }

  get appEnv(): EnvConfig['APP_ENV'] {
    return this.configService.get<EnvConfig['APP_ENV']>('APP_ENV', 'local');
  }

  get appPort(): EnvConfig['APP_PORT'] {
    return this.configService.get<EnvConfig['APP_PORT']>('APP_PORT', 3000);
  }

  get databaseUrl(): EnvConfig['DATABASE_URL'] {
    return this.configService.get<EnvConfig['DATABASE_URL']>('DATABASE_URL', '');
  }

  get JWTSecret(): EnvConfig['JWT_SECRET'] {
    return this.configService.get<EnvConfig['JWT_SECRET']>('JWT_SECRET', "test");
  }

}
