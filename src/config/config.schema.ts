export interface EnvConfig {
  APP_ENV: 'local' | 'staging' | 'test';
  APP_PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  DOCUMENT_BASE_LINK: string;
}
