import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://fabianmelone.github.io',
      'http://172.17.214.162:5173',
      'https://014aba9f8b83.ngrok-free.app',
    ],
    credentials: true,
  });
  await app.listen(3000, '0.0.0.0');
}

bootstrap();
