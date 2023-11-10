import { User } from './index.js';

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

export enum AmenityType {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge',
}

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  image: string;
  type: OfferType;
  housingType: HousingType;
  price: number;
  amenities: AmenityType[];
  user: User;
}
