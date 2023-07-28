import { Module } from '@nestjs/common';
import { TerraformController } from './terraform.controller';
import { TerraformService } from './terraform.service';

@Module({
  controllers: [TerraformController],
  providers: [TerraformService],
})
export class TerraformModule {}
