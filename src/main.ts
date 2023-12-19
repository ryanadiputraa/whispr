import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { validatorException } from './utils/validator-exception';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validatorException,
      stopAtFirstError: true,
    }),
  );

  app.enableCors({ origin: true, exposedHeaders: ['*'] });

  const port = process.env.PORT || 8080;
  await app.listen(port);
  logger.log(`running server on port ${port}`);
}
bootstrap();
