import chalk from 'chalk';
import { READ_FILE_ERROR, Offer, OfferType, Category, User } from '../../../shared/types/index.js';
import { FileReader } from '../../../shared/libs/index.js';
import { getErrorMessage } from '../../../shared/utils/index.js';
import { Command } from '../types/index.js';

export class ImportCommand implements Command {
  constructor() {
    this.handleFileReaderLine = this.handleFileReaderLine.bind(this);
    this.handleFileReaderEnd = this.handleFileReaderEnd.bind(this);
  }

  public getName(): string {
    return '--import';
  }

  public execute(...args: string[]): void {
    const [ mockFilePath ] = args;
    this.read(mockFilePath.trim());
  }

  private async read(filePath: string): Promise<string | void> {
    const fileReader = new FileReader(filePath);
    fileReader.on('line', this.handleFileReaderLine);
    fileReader.on('end', this.handleFileReaderEnd);

    try {
      await fileReader.read();
    } catch (error) {
      throw new Error(getErrorMessage(error, READ_FILE_ERROR));
    }
  }

  private getOffer(tsvLine: string): Offer {
    const dataArray = tsvLine.split('\t');

    const [title, description, createdDate, image, type, price, categories, firstName, lastName, email, avatarPath] = dataArray;
    const arrayCategories: Category[] = categories.split(';').map((cat) => ({name: cat}));
    const user: User = { email, avatarPath, firstName, lastName};

    return {
      title,
      description,
      postDate: new Date(createdDate),
      image,
      type: type as OfferType,
      categories: arrayCategories,
      price: Number.parseInt(price, 10),
      user,
    };
  }

  private handleFileReaderLine(line: string) {
    const offer = this.getOffer(line);
    console.info(offer);
  }

  private handleFileReaderEnd(importedRowCount: string) {
    console.info(chalk.yellow(`Imported row count: ${importedRowCount}`));
  }
}
