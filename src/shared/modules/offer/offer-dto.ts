import { HousingType, AmenityType, IGeoLocation } from '../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public geoLocation: IGeoLocation;
  public previewImage: string;
  public housingPhotos: string[];
  public isPremium: boolean;
  public rating: number;
  public housingType: HousingType;
  public roomCount: number;
  public guestCount: number;
  public price: number;
  public amenities: AmenityType[];
  public userId: string;
}

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public geoLocation?: IGeoLocation;
  public previewImage?: string;
  public housingPhotos?: string[];
  public isPremium?: boolean;
  public rating?: number;
  public housingType?: HousingType;
  public roomCount?: number;
  public guestCount?: number;
  public price?: number;
  public amenities?: AmenityType[];
  public userId?: string;
}
