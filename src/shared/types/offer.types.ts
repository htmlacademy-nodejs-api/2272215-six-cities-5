import { Category, User } from './index.js';

export enum OfferType {
  Buy = 'Buy',
  Sell = 'Sell',
}

export enum HousingType {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel',
}

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  image: string;
  type: OfferType;
  housingType: HousingType;
  price: number;
  categories: Category[];
  user: User;
}
