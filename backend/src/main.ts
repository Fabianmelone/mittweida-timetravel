import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Mittweida Time Travel')
    .setDescription(
      'Mittweida Location Post and Receive API, all the Locations that you visited, will be saved and returned with this API.',
    )
    .setVersion('1.0')
    .addTag('Location')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
