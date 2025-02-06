import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Active CORS pour toutes les origines
  app.enableCors({
    origin: 'http://localhost:4200', // Autorise uniquement le frontend Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
