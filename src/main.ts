import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

const appPort: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 7896;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(appPort);
}

bootstrap();
