import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { AppModule } from './app.module';
import { CustomLogger } from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  app.useLogger(app.get(CustomLogger));
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
      stopAtFirstError: true,
    }),
  );
  app.useGlobalFilters(new ValidationExceptionFilter());

  // start the server
  const port = configService.get<number>('app.port') || 3000;
  await app.listen(port);
}
bootstrap();
