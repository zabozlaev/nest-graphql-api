import { NestFactory } from '@nestjs/core';
import * as cookie from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookie());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
