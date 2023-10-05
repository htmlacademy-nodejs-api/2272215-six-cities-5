import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
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
      console.info(`Version: ${version}`);
    }
    else {
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
    }
    catch(error) {
      console.error(error);
    }
    return result;
  }
}
