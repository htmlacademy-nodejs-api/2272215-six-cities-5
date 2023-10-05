import { CommandCollection } from './types.js';
import { NO_COMMAND } from './constants.js';
import { Command, HelpCommand, VersionCommand, ImportCommand } from '../commands/index.js';


export class CLIApplication {
  private commands: CommandCollection = {};

  constructor() {
    this.registerCommands();
    this.executeCommand();
  }

  private registerCommands(): void {
    const commandList: Command[] = [
      new HelpCommand(),
      new VersionCommand(),
      new ImportCommand(),
    ];

    commandList.forEach((command) => {
      this.commands[command.getName()] = command;
    });
  }

  private executeCommand(): void {
    const [_first, _second, ...restArgs] = process.argv;
    const [inputCommandName, ...inputCommandArgs] = restArgs;

    if(!restArgs.length) {
      this.getCommandByName('--help')?.execute();
      return;
    }

    const foundCommand = this.getCommandByName(inputCommandName);

    if(foundCommand) {
      foundCommand.execute(...inputCommandArgs);
    } else if(this.isCommandWithoutPrefix(inputCommandName)) {
      const error = `${NO_COMMAND}. Может Вы имели в виду --${inputCommandName}?`;
      console.info(error);
    } else {
      console.info(NO_COMMAND);
    }
  }

  private getCommandByName(commandName: string): Command | null {
    const foundCommandName = Object.keys(this.commands).find((key) => key === commandName);
    return foundCommandName ? this.commands[foundCommandName] : null;
  }

  private isCommandWithoutPrefix(commandName: string): boolean {
    const prefixCommandName = `--${commandName}`;
    const foundCommandName = Object.keys(this.commands).find((key) => key === prefixCommandName);
    return !!foundCommandName;
  }
}
