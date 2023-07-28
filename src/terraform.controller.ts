// terraform.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TerraformService } from './terraform.service';

@Controller('test-terraform')
export class TerraformController {
  constructor(private readonly terraformService: TerraformService) {}

  @Post()
  async testTerraform(
    @Body() body: { main: string; vars: string; state: string },
  ) {
    try {
      const result = await this.terraformService.executeTerraform(
        body.main,
        body.vars,
        body.state,
      );
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
