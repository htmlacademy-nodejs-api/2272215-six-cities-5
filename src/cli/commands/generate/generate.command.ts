import dayjs from 'dayjs';
import got from 'got';
import { FileWritter } from '../../../shared/libs/index.js';
import { LOAD_DATA_ERROR, MockServerData, HousingType, AmenityType, City } from '../../../shared/types/index.js';
import { getErrorMessage, getRandomItem, getRandomItems, getRandomNumber, getValueArrayFromEnum } from '../../../shared/utils/index.js';
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

    const housingValues = getValueArrayFromEnum(HousingType);
    const amenityValues = getValueArrayFromEnum(AmenityType);
    const cityValues = getValueArrayFromEnum(City);

    if(!this.serverData) {
      return lines;
    }

    for(let i = 0; i < offerCount; i++) {
      const title = getRandomItem(this.serverData.titles);
      const description = getRandomItem(this.serverData.descriptions);
      const city = getRandomItem(cityValues);
      const previewImage = getRandomItem(this.serverData.previewImages);
      const housingType = getRandomItem(housingValues);
      const price = getRandomNumber(MIN_PRICE, MAX_PRICE).toString();
      const amenities = getRandomItems(amenityValues).join(';');
      const author = getRandomItem(this.serverData.users);
      const email = getRandomItem(this.serverData.emails);
      const avatar = getRandomItem(this.serverData.avatars);

      const postDate = dayjs()
        .subtract(getRandomNumber(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
        .toISOString();
      const [ firstName, lastName ] = author.split(' ');

      const line = [title, description, postDate, city,
        previewImage, housingType, price, amenities,
        firstName, lastName, email, avatar].join('\t');

      lines.push(line);
    }

    return lines;
  }
}
