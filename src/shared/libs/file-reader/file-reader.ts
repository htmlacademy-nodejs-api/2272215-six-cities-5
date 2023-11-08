import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { IFileReader } from './file-reader.interface.js';
import { CHUNK_SIZE } from './constants.js';

export class FileReader extends EventEmitter implements IFileReader {
  constructor(private readonly filePath: string) {
    super();
  }

  public async read(): Promise<void> {
    if(!this.filePath) {
      return;
    }

    const readStream = createReadStream(this.filePath, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeLine = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        await new Promise((resolve) => {
          this.emit('line', completeLine, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
