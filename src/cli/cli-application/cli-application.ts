import chalk from 'chalk';
import { CommandCollection } from './types.js';
import { NO_COMMAND } from './constants.js';
import { Command, HelpCommand, VersionCommand, ImportCommand, GenerateCommand } from '../commands/index.js';


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
      new GenerateCommand(),
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
    const correctedCommandName = this.getCorrectedCommanName(inputCommandName);

    if(foundCommand) {
      foundCommand.execute(...inputCommandArgs);
    } else if(correctedCommandName) {
      const error = `${chalk.yellow(NO_COMMAND)}. Может Вы имели в виду ${correctedCommandName}?`;
      console.info(error);
    } else {
      console.info(NO_COMMAND);
    }
  }

  private getCommandByName(commandName: string): Command | null {
    const foundCommandName = Object.keys(this.commands).find((key) => key === commandName);
    return foundCommandName ? this.commands[foundCommandName] : null;
  }

  private getCorrectedCommanName(commandName: string): string | null {
    const correctCommandName = `--${commandName}`;
    const correctCommandName2 = `-${commandName}`;

    const foundCorrectCommandName = Object.keys(this.commands).reduce((acc: string | null, cmd) => {
      if(!acc && cmd === correctCommandName) {
        return correctCommandName;
      } else if(!acc && cmd === correctCommandName2) {
        return correctCommandName2;
      } else {
        return acc;
      }
    }, null);

    return foundCorrectCommandName;
  }
}
