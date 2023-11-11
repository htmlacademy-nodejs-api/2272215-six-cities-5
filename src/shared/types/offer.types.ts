import { IGeoLocation } from './geo.types.js';
import { User } from './index.js';

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
  geoLocation: IGeoLocation,
  previewImage: string;
  housingPhotos: string[],
  isPremium: boolean,
  rating: number,
  housingType: HousingType;
  roomCount: number,
  guestCount: number,
  price: number;
  amenities: AmenityType[];
  user: User;
}
