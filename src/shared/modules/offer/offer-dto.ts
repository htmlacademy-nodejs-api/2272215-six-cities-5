import { HousingType, AmenityType } from '../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public image: string;
  public housingType: HousingType;
  public price: number;
  public amenities: AmenityType[];
  public userId: string;
}

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public image?: string;
  public housingType?: HousingType;
  public price?: number;
  public amenities?: AmenityType[];
  public userId?: string;
}
