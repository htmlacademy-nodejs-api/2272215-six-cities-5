import chalk from 'chalk';
import { READ_FILE_ERROR, Offer, OfferType, Category, User, HousingType } from '../../../shared/types/index.js';
import { FileReader, ConsoleLogger, IDatabaseClient, ILogger, MongoDatabaseClient } from '../../../shared/libs/index.js';
import { UserService, CategoryService, OfferService, userModel, categoryModel, offerModel, CreateOfferDto, CreateCategoryDto } from '../../../shared/modules/index.js';
import { getErrorMessage, getMongoURI } from '../../../shared/utils/index.js';
import { Command } from '../types/index.js';
import { DB_USER_PASSWORD } from './constants.js';

export class ImportCommand implements Command {
  private logger: ILogger;
  private databaseClient: IDatabaseClient;
  private userService: UserService;
  private categoryService: CategoryService;
  private offerService: OfferService;
  private salt: string;

  constructor() {
    this.handleFileReaderLine = this.handleFileReaderLine.bind(this);
    this.handleFileReaderEnd = this.handleFileReaderEnd.bind(this);

    this.logger = new ConsoleLogger();
    this.databaseClient = new MongoDatabaseClient(this.logger);
    this.userService = new UserService(userModel, this.logger);
    this.categoryService = new CategoryService(categoryModel, this.logger);
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

    const [title, description, createdDate, image, type, housingType, price, categories, firstName, lastName, email, avatarPath] = dataArray;
    const arrayCategories: Category[] = categories.split(';').map((cat) => ({name: cat}));
    const user: User = { email, avatarPath, firstName, lastName};

    return {
      title,
      description,
      postDate: new Date(createdDate),
      image,
      type: type as OfferType,
      housingType: housingType as HousingType,
      categories: arrayCategories,
      price: Number.parseInt(price, 10),
      user,
    } as Offer;
  }

  private async saveOffer(offer: Offer): Promise<void> {
    const categories: string[] = [];

    const user = await this.userService.findOrCreate({...offer.user, password: DB_USER_PASSWORD}, this.salt);

    for (const category of offer.categories) {
      const { name: categoryName } = category;
      const categoryDto: CreateCategoryDto = { name: categoryName };
      const categoryDocument = await this.categoryService.findByNameOrCreate(categoryName, categoryDto);

      if(!categories.includes(categoryDocument.id)) {
        categories.push(categoryDocument.id);
      }
    }

    const offerDto: CreateOfferDto = {
      title: offer.title,
      description: offer.description,
      image: offer.image,
      postDate: offer.postDate,
      price: offer.price,
      type: offer.type,
      housingType: offer.housingType,
      categories,
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
