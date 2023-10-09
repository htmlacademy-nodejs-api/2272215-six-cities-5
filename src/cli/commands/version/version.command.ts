import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import chalk from 'chalk';
import { PARSE_FILE_ERROR } from '../../../shared/types/index.js';
import { Command } from '../types/index.js';
import { VERSION_READ_ERROR } from './types.js';

export class VersionCommand implements Command {
  constructor(private readonly filePath: string = './package.json') {
  }

  public getName(): string {
    return '--version';
  }

  public execute(..._args: string[]): void {
    const version = this.gerVersion();

    if(version) {
      console.info(`${chalk.blue('Version:')} ${version}`);
    } else {
      console.error(VERSION_READ_ERROR);
    }
  }

  private gerVersion(): string | null {
    let result: string | null = null;

    try {
      const fileContent = readFileSync(resolve(this.filePath), 'utf-8');
      const jsonContent = JSON.parse(fileContent);

      if(typeof jsonContent.version === 'string') {
        result = jsonContent.version;
      }
    } catch(error) {
      if(error instanceof Error) {
        throw new Error(chalk.red(error.message));
      } else {
        throw new Error(chalk.red(PARSE_FILE_ERROR));
      }
    }
    return result;
  }
}
