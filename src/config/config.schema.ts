export interface EnvConfig {
  APP_ENV: 'local' | 'staging';
  APP_PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
}
