import { NestFactory } from '@nestjs/core';
import { TerraformModule } from './terraform.module';

async function bootstrap() {
  const app = await NestFactory.create(TerraformModule);
  app.getHttpServer().setTimeout(60000);
  await app.listen(3000);
}
bootstrap();
