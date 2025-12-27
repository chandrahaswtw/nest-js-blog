import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const appCreate = (app: INestApplication<any>) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Blogpost API')
    .setDescription('List of blogpost API endpoints')
    .setLicense('MIT License', 'https://opensource.org/license/mit')
    .setTermsOfService('Some URL')
    .addServer('http://localhost:3000/', 'Development')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appCreate(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
