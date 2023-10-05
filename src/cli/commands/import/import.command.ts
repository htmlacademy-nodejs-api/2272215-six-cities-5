import { readFileSync } from 'node:fs';
import { Command } from '../types/index.js';
import { Offer, OfferType, Category, User } from '../../../shared/types/index.js';
import { READ_FILE_ERROR, PARSE_FILE_ERROR } from './constants.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...args: string[]): void {
    const [ mockFilePath ] = args;

    const fileContent = this.read(mockFilePath);

    if(fileContent) {
      const offers: Offer[] = this.getOffers(fileContent);
      console.log('OFFERS:');
      console.log(offers);
    }
  }

  private read(filePath: string): string | void {
    try {
      return readFileSync(filePath, 'utf-8');
    } catch(error) {
      if(error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(READ_FILE_ERROR);
      }
    }
  }

  private getOffers(fileContent: string): Offer[] {
    let offers: Offer[] = [];
    const lines = fileContent.split('\n').filter((line) => line.trim().length > 0);
    const arrays = lines.map((line) => line.split('\t'));

    try {
      offers = arrays.map((dataArray) => {
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
      });
    } catch(error) {
      if(error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(PARSE_FILE_ERROR);
      }
    }

    return offers;
  }
}
