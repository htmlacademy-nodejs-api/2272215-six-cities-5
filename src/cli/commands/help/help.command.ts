import chalk from 'chalk';
import { Command } from '../types/index.js';
import { COMMAND_TITLE, COMMAND_DESCRIPTION } from './constants.js';

export class HelpCommand implements Command {
  public getName() {
    return '--help';
  }

  public execute(..._args: string[]): void {
    console.info(chalk.yellow(COMMAND_TITLE));
    console.info(COMMAND_DESCRIPTION);
  }
}
