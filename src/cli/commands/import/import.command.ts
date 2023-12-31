import chalk from 'chalk';
import { READ_FILE_ERROR, Offer, User, HousingType, AmenityType, IGeoLocation } from '../../../shared/types/index.js';
import { FileReader, ConsoleLogger, IDatabaseClient, ILogger, MongoDatabaseClient } from '../../../shared/libs/index.js';
import { UserService, OfferService, userModel, offerModel, CreateOfferDto } from '../../../shared/modules/index.js';
import { getErrorMessage, getMongoURI } from '../../../shared/utils/index.js';
import { Command } from '../types/index.js';
import { DB_USER_PASSWORD } from './constants.js';

export class ImportCommand implements Command {
  private logger: ILogger;
  private databaseClient: IDatabaseClient;
  private userService: UserService;
  private offerService: OfferService;
  private salt: string;

  constructor() {
    this.handleFileReaderLine = this.handleFileReaderLine.bind(this);
    this.handleFileReaderEnd = this.handleFileReaderEnd.bind(this);

    this.logger = new ConsoleLogger();
    this.databaseClient = new MongoDatabaseClient(this.logger);
    this.userService = new UserService(userModel, this.logger);
    this.offerService = new OfferService(offerModel, this.logger);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(mockFilePath: string, login: string, password: string, host: string, port: string, dbname: string, salt: string): Promise<void> {
    const connString = getMongoURI(login, password, host, port, dbname);
    this.salt = salt;

    await this.databaseClient.connect(connString);

    await this.read(mockFilePath.trim());
  }

  private async read(filePath: string): Promise<string | void> {
    const fileReader = new FileReader(filePath);
    fileReader.on('line', this.handleFileReaderLine);
    fileReader.on('end', this.handleFileReaderEnd);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Failed to import data from file: ${filePath}`);
      console.error(getErrorMessage(error, READ_FILE_ERROR));
    }
  }

  private getOffer(tsvLine: string): Offer {
    const dataArray = tsvLine.split('\t');

    const [title, description, postDateString, city, previewImage, housingPhotosString, isPremium, rating, housingType,
      roomCount, guestCount, price, amenities, firstName, lastName, email, avatarPath, latitude, longitude] = dataArray;
    const amenityTypes: AmenityType[] = amenities.split(';').map((amenity) => amenity as AmenityType);
    const housingPhotos = housingPhotosString.split(';').map((photo) => photo);
    const user: User = { email, avatarPath, firstName, lastName};
    const geoLocation: IGeoLocation = {
      city,
      geo: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      }
    };

    const offer: Offer = {
      title,
      description,
      postDate: new Date(postDateString),
      geoLocation,
      previewImage,
      housingPhotos,
      isPremium: Boolean(isPremium),
      rating: Number(rating),
      housingType: housingType as HousingType,
      roomCount: parseInt(roomCount, 10),
      guestCount: parseInt(guestCount, 10),
      price: Number.parseInt(price, 10),
      amenities: amenityTypes,
      user,
    };

    return offer;
  }

  private async saveOffer(offer: Offer): Promise<void> {
    const user = await this.userService.findOrCreate({...offer.user, password: DB_USER_PASSWORD}, this.salt);

    const offerDto: CreateOfferDto = {
      title: offer.title,
      description: offer.description,
      postDate: offer.postDate,
      geoLocation: offer.geoLocation,
      previewImage: offer.previewImage,
      housingPhotos: offer.housingPhotos,
      isPremium: offer.isPremium,
      rating: offer.rating,
      housingType: offer.housingType,
      roomCount: offer.roomCount,
      guestCount: offer.guestCount,
      price: offer.price,
      amenities: offer.amenities,
      userId: user.id,
    };

    await this.offerService.create(offerDto);
  }

  private async handleFileReaderLine(line: string, resolve: () => void) {
    const offer = this.getOffer(line);
    await this.saveOffer(offer);
    console.info(offer);
    resolve();
  }

  private async handleFileReaderEnd(importedRowCount: string) {
    console.info(chalk.yellow(`Imported row count: ${importedRowCount}`));
    this.databaseClient.disconnect();
  }
}
