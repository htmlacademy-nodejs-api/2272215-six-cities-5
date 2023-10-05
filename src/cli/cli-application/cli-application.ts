import { CommandCollection } from './types.js';
import { NO_COMMAND, COMMAND_EXECUTION_ERROR } from './constants.js';
import { Command, HelpCommand } from '../commands/index.js';


export class CLIApplication {
  private commands: CommandCollection = {};

  constructor() {
    this.registerCommands();
    this.executeCommand();
  }

  private registerCommands(): void {
    const commandList: Command[] = [
      new HelpCommand()
    ];

    commandList.forEach((command) => {
      this.commands[command.getName()] = command;
    })
  }

  private executeCommand(): void {
    const [_, __, ...restArgs] = process.argv;
    const [inputCommandName, ...inputCommandArgs] = restArgs;

    const foundCommand = this.getCommandByName(inputCommandName);

    if(foundCommand) {
      try {
        foundCommand.execute(...inputCommandArgs);
      }
      catch(err) {
        console.error(COMMAND_EXECUTION_ERROR);
      }
    }
    else {
      console.info(NO_COMMAND);
    }
  }

  private getCommandByName(name: string): Command | null {
    const foundCommandName = Object.keys(this.commands).find((key) => key === name);
    return foundCommandName ? this.commands[foundCommandName] : null;
  }
}
