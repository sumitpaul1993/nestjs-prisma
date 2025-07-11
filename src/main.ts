import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AppConfigService } from './config/config.service';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CustomValidationPipe } from './common/pipe/customValidation.pipe';
import { TrimPipe } from './common/pipe/trim.pipe';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      rawBody: true,
    }
  );
  // Retrieve AppConfigService
  const appConfig = app.get(AppConfigService);
  app.useBodyParser('json', { limit: '10mb' });
  app.setGlobalPrefix('api');
  // app.useStaticAssets(join(__dirname, '..', 'upload'));

  const appEnv = appConfig.appEnv;
  const appPort = appConfig.appPort;
  // Log loaded environment variables
  Logger.log(
    `Env loaded: APP_ENV: '${appEnv}', APP_PORT: ${appPort}`,
    'Bootstrap',
  );

  if (appEnv == 'local' || appEnv == 'staging') {
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    const swaggerConfig = new DocumentBuilder()
      .setTitle("NestJs & Prisma")
      .setDescription("")
      .setVersion("1")
      .addBearerAuth(
        // {
        //   type: 'http',
        //   scheme: 'bearer',
        //   bearerFormat: 'JWT',
        //   name: 'Authorization',
        //   in: 'header',
        // },
        // 'access-token'
      ) // for bearer token
      .build();
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: "Api Docs",
    };
    const document = SwaggerModule.createDocument(
      app,
      swaggerConfig,
    );
    SwaggerModule.setup(
      'api-docs',
      app,
      document,
      customOptions,
    );
  }

  app.useGlobalPipes(new CustomValidationPipe())
  app.useGlobalPipes(new TrimPipe());

  await app.listen(appPort);
}
bootstrap();
