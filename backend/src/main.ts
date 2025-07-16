import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://fabianmelone.github.io',
      'http://192.168.178.196:5173',
    ],
    credentials: true,
  });
  await app.listen(3000, '0.0.0.0');
}

bootstrap();
