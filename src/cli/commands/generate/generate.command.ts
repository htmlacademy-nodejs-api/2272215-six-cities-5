import dayjs from 'dayjs';
import got from 'got';
import { FileWritter } from '../../../shared/libs/index.js';
import { LOAD_DATA_ERROR, MockServerData, HousingType, AmenityType, CityName, geoLocationData } from '../../../shared/types/index.js';
import { getErrorMessage, getRandomItem, getRandomItems, getRandomNumber, getValueArrayFromEnum, getKeyArrayFromEnum } from '../../../shared/utils/index.js';
import { Command } from '../types/index.js';
import { MIN_PRICE, MAX_PRICE, FIRST_WEEK_DAY, LAST_WEEK_DAY, HOUSING_PHOTO_COUNT, MIN_RATING, MAX_RATING,
  MIN_ROOM_COUNT, MAX_ROOM_COUNT, MIN_GUEST_COUNT, MAX_GUEST_COUNT } from './constants.js';

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
    const cityKeys = getKeyArrayFromEnum(CityName);

    if(!this.serverData) {
      return lines;
    }

    for(let i = 0; i < offerCount; i++) {
      const title = getRandomItem(this.serverData.titles);
      const description = getRandomItem(this.serverData.descriptions);
      const cityKey = getRandomItem(cityKeys);
      const city = CityName[cityKey];
      const previewImage = getRandomItem(this.serverData.previewImages);
      const housingPhotos = getRandomItems(this.serverData.housingPhotos, HOUSING_PHOTO_COUNT).join(';');
      const isPremium = getRandomItem([true, false]).toString();
      const rating = getRandomNumber(MIN_RATING, MAX_RATING).toString();
      const housingType = getRandomItem(housingValues);
      const roomCount = getRandomNumber(MIN_ROOM_COUNT, MAX_ROOM_COUNT).toString();
      const guestCount = getRandomNumber(MIN_GUEST_COUNT, MAX_GUEST_COUNT).toString();
      const price = getRandomNumber(MIN_PRICE, MAX_PRICE).toString();
      const amenities = getRandomItems(amenityValues).join(';');
      const author = getRandomItem(this.serverData.users);
      const email = getRandomItem(this.serverData.emails);
      const avatar = getRandomItem(this.serverData.avatars);

      const postDate = dayjs()
        .subtract(getRandomNumber(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
        .toISOString();
      const [ firstName, lastName ] = author.split(' ');
      const latitude = geoLocationData[city].latitude.toString();
      const longitude = geoLocationData[city].longitude.toString();

      const line = [title, description, postDate, city,
        previewImage, housingPhotos, isPremium, rating, housingType, roomCount, guestCount, price, amenities,
        firstName, lastName, email, avatar, latitude, longitude].join('\t');

      lines.push(line);
    }

    return lines;
  }
}
