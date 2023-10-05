import { Command } from '../types/index.js';
import { HELP_RETURN_VALUE } from './constants.js';

export class HelpCommand implements Command {
  public getName() {
    return '--help';
  }

  public execute(...args: string[]): void {
    console.log('Help, execute, args=', args);
    console.info(HELP_RETURN_VALUE);
  }
}
