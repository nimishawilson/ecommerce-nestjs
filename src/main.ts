import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Swagger Configuration
   const config = new DocumentBuilder()
   .setTitle('E-commerce API')  // Title of the API
   .setDescription('The API documentation for the E-commerce platform')  // Description
   .setVersion('1.0')  // Version of the API
   .addTag('products')  // You can add tags to organize your endpoints
   .addBearerAuth()  // If you're using authentication (e.g., JWT)
   .build();

 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api-docs', app, document);  // 'api-docs' is the route where Swagger UI will be available

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
