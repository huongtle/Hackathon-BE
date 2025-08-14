import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Adjust this to your needs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Medical Symptom Analysis API')
    .setDescription('API for analyzing medical symptoms and personal information')
    .setVersion('1.0')
    .addTag('App', 'Application endpoints')
    .addTag('Person Info', 'Personal information management')
    .addTag('AI Analysis', 'AI-powered symptom analysis')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
