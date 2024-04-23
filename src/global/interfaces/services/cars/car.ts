import { IModel } from '../models';
import { IColor } from '../colors';
import { ITransmission } from '../transmissions';
import { IFuel } from '../fuels';
import { ICity } from '../cities';

export interface ICarAndId {
  id: string;
  car: ICar;
}

export interface ICar {
  id: string;
  model: IModel;
  color: IColor;
  transmission: ITransmission;
  fuel: IFuel;
  year: number;
  dailyPrice: number;
  images: {
    featuredImage: string;
    otherImages: string[];
  };
  seat: number;
  city: ICity;
  createdDate: Date;
  updatedDate: Date;
}
