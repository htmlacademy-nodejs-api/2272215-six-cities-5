import dayjs from 'dayjs';
import got from 'got';
import { FileWritter } from '../../../shared/libs/index.js';
import { LOAD_DATA_ERROR, MockServerData, OfferType, HousingType } from '../../../shared/types/index.js';
import { getErrorMessage, getRandomItem, getRandomItems, getRandomNumber, getArrayFromEnum } from '../../../shared/utils/index.js';
import { Command } from '../types/index.js';
import { MIN_PRICE, MAX_PRICE, FIRST_WEEK_DAY, LAST_WEEK_DAY } from './constants.js';

// npm run cli -- --generate 3 ./mocks/mock-data.tsv http://localhost:3333/api
// npm run cli -- --generate 3 ./mocks/mock-data.tsv http://127.0.0.1:3333/api

export class GenerateCommand implements Command {
  private serverData: MockServerData;
  public getName(): string {
    return '--generate';
  }

  public async execute(...args: string[]): Promise<void> {
    const [ offerCountArg, filePath, url ] = args;
    const offerCount = Number.parseInt(offerCountArg, 10);

    await this.loadData(url);
    this.write(filePath, offerCount);
  }

  private async loadData(url: string) {
    try {
      this.serverData = await got.get(url).json();
    } catch(error) {
      throw new Error(getErrorMessage(error, LOAD_DATA_ERROR));
    }
  }

  private async write(filePath: string, offerCount: number): Promise<void> {
    const lines = this.generateLines(offerCount);
    const fileWritter = new FileWritter(filePath);
    await fileWritter.write(lines);
  }

  private generateLines(offerCount: number): string[] {
    const lines: string[] = [];

    const housingTypeArray = getArrayFromEnum(HousingType);
    const offerTypeArray = getArrayFromEnum(OfferType);

    if(!this.serverData) {
      return lines;
    }

    for(let i = 0; i < offerCount; i++) {
      const title = getRandomItem(this.serverData.titles);
      const categories = getRandomItems(this.serverData.categories).join(';');
      const description = getRandomItem(this.serverData.descriptions);
      const photo = getRandomItem(this.serverData.offerImages);
      const type = getRandomItem(offerTypeArray);
      const housingType = getRandomItem(housingTypeArray);
      const price = getRandomNumber(MIN_PRICE, MAX_PRICE).toString();
      const author = getRandomItem(this.serverData.users);
      const email = getRandomItem(this.serverData.emails);
      const avatar = getRandomItem(this.serverData.avatars);

      const createdDate = dayjs()
        .subtract(getRandomNumber(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
        .toISOString();
      const [ firstName, lastName ] = author.split(' ');

      const line = [title, description, createdDate,
        photo, type, housingType, price, categories,
        firstName, lastName, email, avatar].join('\t');

      lines.push(line);
    }

    return lines;
  }
}
