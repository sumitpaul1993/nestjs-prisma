import * as Joi from 'joi';

export const validationSchema = Joi.object({
  APP_ENV: Joi.string().valid('local', 'staging', 'test').default('local'),
  APP_PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  DOCUMENT_BASE_LINK: Joi.string().required(),
});
