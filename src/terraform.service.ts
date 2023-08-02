import { BadRequestException, Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { promisify } from 'util';
import { provider, variables } from './data-terraform';
import { dirname } from 'path';

@Injectable()
export class TerraformService {
  private readonly exec = promisify(exec);

  async executeTerraform(main: string, vars: string, state: string) {
    const randomId = Math.random().toString(36).substring(2, 15);

    const tempDir = `${dirname(__dirname)}/tmp/${randomId}`;

    try {
      await fs.mkdir(tempDir);
      await fs.writeFile(`${tempDir}/main.tf`, main);
      await fs.writeFile(`${tempDir}/variables.tf`, variables);
      await fs.writeFile(`${tempDir}/provider.tf`, provider);
      await fs.writeFile(`${tempDir}/vars.tfvars`, vars);
      await fs.writeFile(`${tempDir}/state.tfstate`, state);

      await this.exec('terraform init', {
        cwd: tempDir,
      });

      const { stdout } = await this.exec(
        'terraform apply -auto-approve -var-file=vars.tfvars -json',
        {
          cwd: tempDir,
        },
      );

      const newState = await fs.readFile(`${tempDir}/state.tfstate`, 'utf8');

      return { newState, output: JSON.parse(stdout) };
    } catch (err) {
      /* 
        err.stdout returns the output of the terraform
        err.stderr returns only shell command failure output

        If the terraform fails, the err.stdout will be the terraform output with the throwing of an exception.
       */

      /*
        if error.stdout is empty, the error is not from terraform, but from the shell command or other origin.
      */
      throw new BadRequestException(err?.stdout || err?.stderr || err);
    } finally {
      await fs.rm(tempDir, { recursive: true });
    }
  }
}
