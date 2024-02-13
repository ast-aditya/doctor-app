import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AtGuard } from './common/guards';

//swagger function implementation :)

async function bootstrap() {
  console.log("hI I AM CONSOLE",process.env.MONGO_URI);
  const app = await NestFactory.create(AppModule);
  

  const config = new DocumentBuilder()
  .setTitle('Hospital project')
  .setDescription('Swagger integrated for the modules')
  .setVersion('1.0')
  .addTag('Hosproject')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);

  app.useGlobalPipes(new ValidationPipe());
  // console.log("hI I AM CONSOLE",process.env.MONGO_URI);
  await app.listen(3000);
}
bootstrap();
