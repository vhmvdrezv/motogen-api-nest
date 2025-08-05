import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // class-validator & class-transformer
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  
  // response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor()); // Now all responses are wrapped!
 
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Car Management API')
    .addTag('Authentication', 'User authentication endpoints')
    .addTag('Users', 'User profile management')
    .addTag('Cars', 'User car management')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Car Management API Documentation',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
