import { NestFactory } from '@nestjs/core';
import { TerraformModule } from './terraform.module';

async function bootstrap() {
  const app = await NestFactory.create(TerraformModule);
  await app.listen(3000);
}
bootstrap();
