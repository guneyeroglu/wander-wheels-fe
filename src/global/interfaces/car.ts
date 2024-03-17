export interface ICar {
  id: string;
  brand: string;
  model: string;
  year: number;
  hourPrice: number;
  color: IColor;
  image: string;
  transmission: TransmissionType;
  fuelType: FuelType;
  seat: number;
  avaliable: {
    status: boolean;
    date: Date;
  };
  createdDate: Date;
  updatedDate: Date;
}

export interface IColor {
  text: ColorType;
  hex: string;
}

export type ColorType = 'Grey' | 'Black' | 'White';
export type TransmissionType = 'Automatic' | 'Manual' | 'Hybrid';
export type FuelType = 'Electric' | 'Petrol';
