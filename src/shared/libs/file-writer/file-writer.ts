import { createWriteStream, WriteStream } from 'node:fs';
import { IFileWriter } from './file-writer.interface.js';

export class FileWritter implements IFileWriter {
  private stream: WriteStream;

  constructor(fileName: string) {
    this.stream = createWriteStream(fileName, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  public async write(lines: string[]): Promise<void> {
    for(let i = 0; i < lines.length; i++) {
      await this.writeLine(lines[i]);
    }
  }

  private async writeLine(line: string): Promise<unknown> {
    const writeSuccess = this.stream.write(`${line}\n`);
    if (!writeSuccess) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve(true));
      });
    }

    return Promise.resolve();
  }
}
