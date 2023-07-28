import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { promisify } from 'util';
import { provider, variables } from './data-terraform';

@Injectable()
export class TerraformService {
  private readonly exec = promisify(exec);

  async executeTerraform(main: string, vars: string, state: string) {
    const randomId = Math.random().toString(36).substring(2, 15);
    const tempDir = `/app/tmp/${randomId}`;

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

      const { stdout, stderr } = await this.exec(
        'terraform apply -auto-approve -var-file=vars.tfvars',
        {
          cwd: tempDir,
        },
      );

      console.log('stderr', stderr);

      console.log('stdout', stdout);
      const newState = await fs.readFile(`${tempDir}/state.tfstate`, 'utf8');

      // await fs.rm(tempDir, { recursive: true });

      return { newState, output: JSON.parse(stdout) };
    } catch (err) {
      // await fs.rm(tempDir, { recursive: true });

      throw err;
    }
  }
}
