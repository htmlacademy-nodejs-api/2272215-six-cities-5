import { Command } from '../types/index.js';
import { HELP_RETURN_VALUE } from './constants.js';

export class HelpCommand implements Command {
  public getName() {
    return '--help';
  }

  public execute(..._args: string[]): void {
    console.info(HELP_RETURN_VALUE);
  }
}
